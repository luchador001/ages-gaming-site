import { Component, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LanguageService } from '../../services/language';
import { translations } from '../../i18n/translations';
import { CONTACT_FORM_CONFIG } from '../../config/contact-form.config';

const NAME_PATTERN = /^[\p{L}\p{M} '-]+$/u;
const MIN_SUBMIT_DELAY_MS = 2000;

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error' | 'too-fast';

function isControlChar(codePoint: number): boolean {
  return codePoint < 0x20 || codePoint === 0x7f;
}

// Strips control/line-break characters so form values can't be abused for
// email header injection or to smuggle hidden content into the notification.
function sanitizeSingleLine(value: string): string {
  let result = '';
  for (const char of value) {
    result += isControlChar(char.codePointAt(0)!) ? ' ' : char;
  }
  return result.replace(/\s{2,}/g, ' ').trim();
}

function sanitizeMultiLine(value: string): string {
  const normalized = value.replace(/\r\n?/g, '\n');
  let result = '';
  for (const char of normalized) {
    const code = char.codePointAt(0)!;
    if (code === 0x0a || !isControlChar(code)) {
      result += char;
    }
  }
  return result.trim();
}

@Component({
  selector: 'app-contact-card',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-card.html',
  styleUrl: './contact-card.scss',
})
export class ContactCard {
  private readonly formBuilder = inject(FormBuilder);
  private readonly language = inject(LanguageService);
  private readonly http = inject(HttpClient);

  protected readonly t = computed(() => translations[this.language.lang()]);

  protected readonly status = signal<SubmitStatus>('idle');

  private readonly renderedAt = Date.now();

  protected readonly contactForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80), Validators.pattern(NAME_PATTERN)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    subject: ['', [Validators.maxLength(150)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(3000)]],
    // Honeypot: left empty by humans, filled in by bots that auto-fill every field.
    // Kept off-screen (not display:none) so simplistic bots that skip hidden
    // fields still fill it in.
    website: [''],
  });

  protected get name() {
    return this.contactForm.controls.name;
  }
  protected get email() {
    return this.contactForm.controls.email;
  }
  protected get subject() {
    return this.contactForm.controls.subject;
  }
  protected get message() {
    return this.contactForm.controls.message;
  }

  protected async onSubmit(): Promise<void> {
    if (this.status() === 'submitting') {
      return;
    }

    if (this.contactForm.controls.website.value) {
      // Bot tripped the honeypot: pretend success, send nothing.
      this.contactForm.reset();
      this.status.set('success');
      return;
    }

    if (Date.now() - this.renderedAt < MIN_SUBMIT_DELAY_MS) {
      this.status.set('too-fast');
      return;
    }

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const { name, email, subject, message } = this.contactForm.getRawValue();
    const payload = {
      access_key: CONTACT_FORM_CONFIG.web3FormsAccessKey,
      subject: subject ? `AGES Gaming contact: ${sanitizeSingleLine(subject)}` : 'AGES Gaming contact form message',
      from_name: sanitizeSingleLine(name),
      name: sanitizeSingleLine(name),
      email: sanitizeSingleLine(email),
      replyto: sanitizeSingleLine(email),
      message: sanitizeMultiLine(message),
      botcheck: false,
    };

    this.status.set('submitting');

    try {
      const response = await firstValueFrom(
        this.http.post<{ success: boolean }>(CONTACT_FORM_CONFIG.web3FormsEndpoint, payload),
      );

      if (!response?.success) {
        throw new Error('Web3Forms reported failure');
      }

      this.contactForm.reset();
      this.status.set('success');
    } catch {
      this.status.set('error');
    }
  }
}

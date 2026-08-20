import { Component, computed, inject } from '@angular/core';
import { LanguageService } from '../../services/language';
import { ModalService } from '../../services/modal';
import { translations } from '../../i18n/translations';

@Component({
  selector: 'app-hero-content',
  imports: [],
  templateUrl: './hero-content.html',
  styleUrl: './hero-content.scss',
})
export class HeroContent {
  private readonly language = inject(LanguageService);
  protected readonly modal = inject(ModalService);

  protected readonly t = computed(() => translations[this.language.lang()]);

  protected openAboutModal(event: Event): void {
    event.preventDefault();
    this.modal.open('about');
  }
}

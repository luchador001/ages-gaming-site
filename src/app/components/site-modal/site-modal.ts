import { Component, HostListener, computed, inject } from '@angular/core';
import { ModalService } from '../../services/modal';
import { LanguageService } from '../../services/language';
import { translations } from '../../i18n/translations';

@Component({
  selector: 'app-site-modal',
  imports: [],
  templateUrl: './site-modal.html',
  styleUrl: './site-modal.scss',
})
export class SiteModal {
  protected readonly modal = inject(ModalService);
  private readonly language = inject(LanguageService);

  protected readonly t = computed(() => translations[this.language.lang()]);

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.modal.active()) {
      this.modal.close();
    }
  }
}

import { Component, computed, inject, signal } from '@angular/core';
import { ThemeService } from '../../services/theme';
import { SoundService } from '../../services/sound';
import { LanguageService } from '../../services/language';
import { ModalService, ModalId } from '../../services/modal';
import { translations } from '../../i18n/translations';

interface NavLink {
  labelKey: 'games' | 'about' | 'terms';
  href: string;
  modal?: ModalId;
}

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly theme = inject(ThemeService);
  protected readonly sound = inject(SoundService);
  protected readonly language = inject(LanguageService);
  protected readonly modal = inject(ModalService);

  protected readonly t = computed(() => translations[this.language.lang()]);

  protected readonly navLinks: NavLink[] = [
    { labelKey: 'games', href: '#games' },
    { labelKey: 'about', href: '#about', modal: 'about' },
    { labelKey: 'terms', href: '#terms', modal: 'terms' },
  ];

  protected readonly isMenuOpen = signal(false);

  protected toggleTheme(): void {
    this.theme.toggle();
  }

  protected toggleSound(): void {
    this.sound.toggle();
  }

  protected toggleLanguage(): void {
    this.language.toggle();
  }

  protected onNavClick(link: NavLink, event: Event): void {
    if (link.modal) {
      event.preventDefault();
      this.modal.open(link.modal);
    }
    this.closeMenu();
  }

  protected toggleMenu(): void {
    this.isMenuOpen.update((value) => !value);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}

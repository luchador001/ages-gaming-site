import { Component, inject, signal } from '@angular/core';
import { ThemeService } from '../../services/theme';

interface NavLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly theme = inject(ThemeService);

  protected readonly navLinks: NavLink[] = [
    { label: 'Games', href: '#games' },
    { label: 'About Studio', href: '#about' },
    { label: 'Terms and Conditions', href: '#terms' },
  ];

  protected readonly isMenuOpen = signal(false);

  protected toggleTheme(): void {
    this.theme.toggle();
  }

  protected toggleMenu(): void {
    this.isMenuOpen.update((value) => !value);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}

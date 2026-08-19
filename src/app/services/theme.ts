import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'ages-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly modeSignal = signal<ThemeMode>(this.resolveInitialMode());
  readonly mode = this.modeSignal.asReadonly();

  constructor() {
    this.applyClass(this.modeSignal());
  }

  toggle(): void {
    this.set(this.modeSignal() === 'dark' ? 'light' : 'dark');
  }

  set(mode: ThemeMode): void {
    this.modeSignal.set(mode);
    this.applyClass(mode);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // Storage can be unavailable (private browsing, disabled cookies) — theme just won't persist.
    }
  }

  private resolveInitialMode(): ThemeMode {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    } catch {
      // Ignore, fall through to system preference.
    }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private applyClass(mode: ThemeMode): void {
    document.documentElement.classList.toggle('theme-dark', mode === 'dark');
  }
}

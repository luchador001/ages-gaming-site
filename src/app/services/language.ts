import { Injectable, signal } from '@angular/core';

export type Lang = 'en' | 'ru';

const STORAGE_KEY = 'ages-lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly langSignal = signal<Lang>(this.resolveInitialLang());
  readonly lang = this.langSignal.asReadonly();

  constructor() {
    document.documentElement.lang = this.langSignal();
  }

  toggle(): void {
    this.set(this.langSignal() === 'en' ? 'ru' : 'en');
  }

  set(lang: Lang): void {
    this.langSignal.set(lang);
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Storage can be unavailable (private browsing, disabled cookies) — preference just won't persist.
    }
  }

  private resolveInitialLang(): Lang {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'ru') {
        return stored;
      }
    } catch {
      // Ignore, fall through to browser-language detection.
    }
    return navigator.language?.toLowerCase().startsWith('ru') ? 'ru' : 'en';
  }
}

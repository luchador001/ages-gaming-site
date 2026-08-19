import { Injectable, signal } from '@angular/core';

export type ViewportTier = 'mobile' | 'tablet' | 'web';

// Keep these in sync with $mobile-max / $tablet-max in src/styles/_breakpoints.scss.
const MOBILE_MAX = 768;
const TABLET_MAX = 1100;

/**
 * Mirrors the SCSS width breakpoints as `is-mobile` / `is-tablet` / `is-web`
 * classes on <html>. CSS media queries already scope the responsive rem
 * scale per tier independently of these classes; this service exists for the
 * cases that need the *current* tier in TypeScript (e.g. gating the
 * viewport-fit correction to the web tier only, since the inline style it
 * sets would otherwise outrank the tablet/mobile breakpoint rules) or in a
 * template (e.g. the burger nav).
 */
@Injectable({ providedIn: 'root' })
export class ViewportService {
  private readonly tierSignal = signal<ViewportTier>(this.computeTier());
  readonly tier = this.tierSignal.asReadonly();

  private readonly handleResize = (): void => {
    const next = this.computeTier();
    if (next !== this.tierSignal()) {
      this.tierSignal.set(next);
      this.applyClass(next);
    }
  };

  constructor() {
    this.applyClass(this.tierSignal());
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('orientationchange', this.handleResize);
  }

  private computeTier(): ViewportTier {
    const width = window.innerWidth;
    if (width <= MOBILE_MAX) {
      return 'mobile';
    }
    if (width <= TABLET_MAX) {
      return 'tablet';
    }
    return 'web';
  }

  private applyClass(tier: ViewportTier): void {
    const classes = document.documentElement.classList;
    classes.remove('is-mobile', 'is-tablet', 'is-web');
    classes.add(`is-${tier}`);
  }
}

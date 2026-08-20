import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { VideoBackground } from './components/video-background/video-background';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { SiteModal } from './components/site-modal/site-modal';
import { ViewportService } from './services/viewport';
import { ThemeService } from './services/theme';

@Component({
  selector: 'app-root',
  imports: [VideoBackground, Header, Hero, SiteModal],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit, OnDestroy {
  @ViewChild('shell', { static: true }) private readonly shellRef!: ElementRef<HTMLDivElement>;

  // Injected (rather than only used inside Header) so the is-web/is-tablet/is-mobile
  // classes and the theme class both exist on <html> from the very first paint.
  private readonly viewport = inject(ViewportService);
  private readonly theme = inject(ThemeService);

  private frameId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private readonly onResize = () => this.scheduleFit();

  ngAfterViewInit(): void {
    this.scheduleFit();

    // ResizeObserver on the shell catches every real viewport-driven size
    // change (window drag, DPI/zoom, device rotation) independent of
    // whether a "resize" event happens to fire for the cause. The shell's
    // own box (100dvh, full width) never changes as a side effect of the
    // font-size adjustments made below, so this can't feed back on itself.
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.scheduleFit());
      this.resizeObserver.observe(this.shellRef.nativeElement);
    }

    window.addEventListener('resize', this.onResize);
    document.fonts?.ready.then(() => this.scheduleFit()).catch(() => {});
    // Late-loading assets (e.g. the logo image) can still change section
    // heights after the first pass, so take one more measurement shortly after.
    setTimeout(() => this.scheduleFit(), 500);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
    this.resizeObserver?.disconnect();
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  private scheduleFit(): void {
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
    }
    this.frameId = requestAnimationFrame(() => this.fitToViewport());
  }

  /**
   * Every rem-based size in this app derives from the html font-size, which
   * the SCSS breakpoints already set per device class. If the header + hero
   * still don't fit the viewport at that size (e.g. a short browser window),
   * scale the root font-size down uniformly so nothing needs to scroll.
   *
   * This inline style is a hard override — it beats every media-query rule,
   * including the tablet/mobile vmin-based font scale. So it only ever runs
   * on the web tier; tablet/mobile stay entirely CSS-driven via the
   * is-tablet/is-mobile classes from ViewportService.
   */
  private fitToViewport(): void {
    document.documentElement.style.fontSize = '';

    if (this.viewport.tier() !== 'web') {
      return;
    }

    const root = this.shellRef.nativeElement;
    const header = root.querySelector<HTMLElement>('.site-header');
    const hero = root.querySelector<HTMLElement>('.hero');
    const heroContent = root.querySelector<HTMLElement>('.hero-content');
    const contactCard = root.querySelector<HTMLElement>('.contact-card');
    if (!header || !hero || !heroContent || !contactCard) {
      return;
    }

    const heroStyle = getComputedStyle(hero);
    const heroPaddingY = parseFloat(heroStyle.paddingTop) + parseFloat(heroStyle.paddingBottom);
    const isStacked = heroStyle.flexDirection === 'column';
    const gap = parseFloat(heroStyle.rowGap) || 0;
    const contentHeight = isStacked
      ? heroContent.offsetHeight + gap + contactCard.offsetHeight
      : Math.max(heroContent.offsetHeight, contactCard.offsetHeight);

    const needed = header.offsetHeight + heroPaddingY + contentHeight;
    const available = root.clientHeight;

    if (needed > available && needed > 0) {
      const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const scale = (available / needed) * 0.985;
      document.documentElement.style.fontSize = `${Math.max(baseFontSize * scale, 4)}px`;
    }
  }
}

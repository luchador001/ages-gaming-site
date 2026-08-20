import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'ages-sound-muted';

@Injectable({ providedIn: 'root' })
export class SoundService {
  private readonly mutedSignal = signal(this.resolveInitialMuted());
  readonly muted = this.mutedSignal.asReadonly();

  // Applying `.muted` straight to the element here (rather than via an
  // `effect()`) guarantees the change lands in the same synchronous click
  // handler — this app runs zoneless, so an effect's re-run after a signal
  // write isn't guaranteed to land before the next paint/interaction.
  private videoEl: HTMLVideoElement | null = null;

  registerVideo(video: HTMLVideoElement): void {
    this.videoEl = video;
    video.muted = this.mutedSignal();
  }

  toggle(): void {
    this.set(!this.mutedSignal());
  }

  set(muted: boolean): void {
    this.mutedSignal.set(muted);
    if (this.videoEl) {
      this.videoEl.muted = muted;
    }
    try {
      localStorage.setItem(STORAGE_KEY, String(muted));
    } catch {
      // Storage can be unavailable (private browsing, disabled cookies) — preference just won't persist.
    }
  }

  private resolveInitialMuted(): boolean {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'true' || stored === 'false') {
        return stored === 'true';
      }
    } catch {
      // Ignore, fall back to muted-by-default (required for autoplay).
    }
    return true;
  }
}

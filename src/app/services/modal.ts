import { Injectable, signal } from '@angular/core';

export type ModalId = 'about' | 'terms';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private readonly activeSignal = signal<ModalId | null>(null);
  readonly active = this.activeSignal.asReadonly();

  private originalBodyPaddingRight = '';

  open(id: ModalId): void {
    this.activeSignal.set(id);

    // Locking scroll via overflow:hidden removes the scrollbar, which
    // shrinks the viewport width and jerks all fixed/sticky content
    // sideways. Padding the body by exactly that width keeps the layout
    // the same size, so nothing visibly shifts. Measured before hiding
    // overflow, since the scrollbar (and this gap) disappears once it's set.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    this.originalBodyPaddingRight = document.body.style.paddingRight;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    this.activeSignal.set(null);
    document.body.style.overflow = '';
    document.body.style.paddingRight = this.originalBodyPaddingRight;
  }
}

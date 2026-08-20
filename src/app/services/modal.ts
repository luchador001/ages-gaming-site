import { Injectable, signal } from '@angular/core';

export type ModalId = 'about' | 'terms';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private readonly activeSignal = signal<ModalId | null>(null);
  readonly active = this.activeSignal.asReadonly();

  open(id: ModalId): void {
    this.activeSignal.set(id);
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    this.activeSignal.set(null);
    document.body.style.overflow = '';
  }
}

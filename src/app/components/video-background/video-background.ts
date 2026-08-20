import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { SoundService } from '../../services/sound';

@Component({
  selector: 'app-video-background',
  imports: [],
  templateUrl: './video-background.html',
  styleUrl: './video-background.scss',
})
export class VideoBackground implements AfterViewInit, OnDestroy {
  @ViewChild('bgVideo') private videoRef?: ElementRef<HTMLVideoElement>;

  private readonly sound = inject(SoundService);

  private readonly resumePlayback = () => {
    const video = this.videoRef?.nativeElement;
    if (video?.paused) {
      video.play()?.catch(() => {});
    }
  };

  ngAfterViewInit(): void {
    // Angular creates the <video> via renderer calls rather than the HTML
    // parser, so the static `muted` attribute alone does not initialize the
    // `.muted` IDL property (unlike parsed markup). SoundService applies the
    // current preference here and keeps the element in sync on every future
    // toggle, imperatively, so it can't lag behind the signal.
    const video = this.videoRef?.nativeElement;
    if (video) {
      this.sound.registerVideo(video);
    }
    this.resumePlayback();
    document.addEventListener('click', this.resumePlayback, { passive: true });
    document.addEventListener('touchstart', this.resumePlayback, { passive: true });
    document.addEventListener('visibilitychange', this.resumePlayback);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.resumePlayback);
    document.removeEventListener('touchstart', this.resumePlayback);
    document.removeEventListener('visibilitychange', this.resumePlayback);
  }
}
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-background',
  imports: [],
  templateUrl: './video-background.html',
  styleUrl: './video-background.scss',
})
export class VideoBackground implements AfterViewInit, OnDestroy {
  @ViewChild('bgVideo') private videoRef?: ElementRef<HTMLVideoElement>;

  private readonly resumePlayback = () => {
    const video = this.videoRef?.nativeElement;
    if (video?.paused) {
      video.play()?.catch(() => {});
    }
  };

  ngAfterViewInit(): void {
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
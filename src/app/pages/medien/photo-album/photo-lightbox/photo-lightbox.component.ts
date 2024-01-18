import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {MasonryImage} from "../masonry-image";
import * as Hammer from 'hammerjs';

@Component({
  selector: 'app-photo-lightbox',
  templateUrl: './photo-lightbox.component.html',
  styleUrls: ['./photo-lightbox.component.scss']
})
export class PhotoLightboxComponent {

  @Input() image: MasonryImage;

  @Output() close = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  @HostListener('window:keydown.ArrowLeft')
  handleArrowLeft() {
    this.previous.emit();
  }

  @HostListener('window:keydown.ArrowRight')
  handleArrowRight() {
    this.next.emit();
  }

  @HostListener('window:keydown.Escape')
  handleEsc() {
    this.close.emit();
  }

  constructor() {
    const hammer = new Hammer(document.documentElement);
    hammer.on('swipeleft', () => this.next.emit());
    hammer.on('swiperight', () => this.previous.emit());
  }

  closeLightbox(event: Event) {
    if (event.target["localName"] !== "mat-icon" && event.target["localName"] !== "img") {
      this.close.emit();
    }
  }

  nextImage() {
    this.next.emit();
  }

  previousImage() {
    this.previous.emit();
  }
}

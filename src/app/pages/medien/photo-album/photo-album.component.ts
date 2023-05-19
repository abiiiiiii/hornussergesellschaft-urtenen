import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PhotoAlbumService} from "../../../shared/services/photo-album.service";
import {Album} from "../../../shared/models/album.model";
import {FileService} from "../../../shared/services/file.service";
import {MasonryImage} from "./masonry-image";

@Component({
  selector: 'app-photo-album',
  templateUrl: './photo-album.component.html',
  styleUrls: ['./photo-album.component.scss']
})
export class PhotoAlbumComponent {

  album: Album;
  masonryImages: MasonryImage[] = [];
  lightboxImage: MasonryImage;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private photoAlbumService: PhotoAlbumService,
    private fileService: FileService) {

    photoAlbumService.getAlbumById(this.route.snapshot.paramMap.get('id')).subscribe(album => {
      this.album = album;

      this.album.images.forEach(image => {
        this.fileService.getImage('albums/' + album.id + '/' + image).subscribe(url => {
          this.masonryImages.push({
            name: image,
            url
          });
          this.masonryImages.sort((a, b) => album.images.indexOf(a.name) - album.images.indexOf(b.name));
        });
      });
    });
  }

  openLightbox(image: MasonryImage) {
    this.lightboxImage = image;
  }

  closeLightbox() {
    this.lightboxImage = null;
  }

  previousImage() {
    const index = this.masonryImages.indexOf(this.lightboxImage);
    if (index > 0) {
      this.lightboxImage = this.masonryImages[index - 1];
    } else {
      this.lightboxImage = this.masonryImages[this.masonryImages.length - 1];
    }
  }

  nextImage() {
    const index = this.masonryImages.indexOf(this.lightboxImage);
    if (index < this.masonryImages.length - 1) {
      this.lightboxImage = this.masonryImages[index + 1];
    } else {
      this.lightboxImage = this.masonryImages[0];
    }
  }
}

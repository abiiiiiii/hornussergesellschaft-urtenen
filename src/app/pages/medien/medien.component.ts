import {Component, OnInit, ViewChild} from '@angular/core';
import {PhotoAlbumService} from "../../shared/services/photo-album.service";
import {Album} from "../../shared/models/album.model";
import {FileService} from "../../shared/services/file.service";
import {NgxMasonryComponent} from "ngx-masonry";

@Component({
  selector: 'app-medien',
  templateUrl: './medien.component.html',
  styleUrls: ['./medien.component.scss']
})
export class MedienComponent implements OnInit {

  albums: Album[] = [];
  years: number[] = [];

  constructor(private photoAlbumService: PhotoAlbumService, private fileService: FileService) {

    this.photoAlbumService.getAllAlbums().subscribe(res => {
      this.albums = res;

      this.albums.forEach(album => {
        this.fileService.getImage('albums/' + album.id + '/' + album.images[0]).subscribe(url => {
          album.cover = url;
        });
      });

      this.years = res.map(album => album.year)
        .filter((value, index, self) => self.indexOf(value) === index).sort((a, b) => b - a);
    })
  }

  ngOnInit(): void {
  }

  getAlbumsByYear(year: number): Album[] {
    return this.albums.filter(album => album.year === year);
  }

}

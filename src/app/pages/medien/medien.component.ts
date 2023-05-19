import {Component, OnInit, ViewChild} from '@angular/core';
import {PhotoAlbumService} from "../../shared/services/photo-album.service";
import {Album} from "../../shared/models/album.model";
import {FileService} from "../../shared/services/file.service";
import {NgxMasonryComponent} from "ngx-masonry";
import {AuthService} from "../../core/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {AddPhotoAlbumComponent} from "./add-photo-album/add-photo-album.component";
import {Router} from "@angular/router";
import {combineLatest} from "rxjs";
import {EditPhotoAlbumComponent} from "./edit-photo-album/edit-photo-album.component";

@Component({
  selector: 'app-medien',
  templateUrl: './medien.component.html',
  styleUrls: ['./medien.component.scss']
})
export class MedienComponent implements OnInit {

  albums: Album[] = [];
  years: number[] = [];

  constructor(
    private photoAlbumService: PhotoAlbumService,
    private fileService: FileService,
    private dialog: MatDialog,
    private router: Router,
    public authService: AuthService) {

    this.loadAlbums();
  }

  ngOnInit(): void {
  }

  loadAlbums() {
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

  getAlbumsByYear(year: number): Album[] {
    return this.albums.filter(album => album.year === year);
  }

  addAlbum() {
    this.dialog.open(AddPhotoAlbumComponent).afterClosed().subscribe(() => {
      this.loadAlbums();
    });
  }

  edit(album: Album) {
    this.dialog.open(EditPhotoAlbumComponent, {data: album}).afterClosed().subscribe(() => {
      this.loadAlbums();
    });
  }

  delete(album: Album) {

    let deleteImages = album.images.map(image => this.fileService.delete('images/albums/' + album.id + '/' + image));

    combineLatest([
      ...deleteImages,
      this.photoAlbumService.deleteAlbum(album.id)
    ]).subscribe(() => {
      this.albums = this.albums.filter(a => a.id !== album.id);
    });
  }

  openAlbum(event: Event, link: string) {
    if (event.target['localName'] !== 'mat-icon') {
      this.router.navigate([link]);
    }
  }
}

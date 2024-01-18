import {Component, Inject} from '@angular/core';
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {PhotoAlbumService} from "../../../shared/services/photo-album.service";
import {Album} from "../../../shared/models/album.model";
import {FileUploadService} from "../../../shared/services/file-upload.service";
import {combineLatest} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Game} from "../../../shared/models/game.model";

@Component({
  selector: 'app-edit-photo-album',
  templateUrl: './edit-photo-album.component.html',
  styleUrls: ['./edit-photo-album.component.scss']
})
export class EditPhotoAlbumComponent {

  images: File[] = [];
  albumForm: UntypedFormGroup;
  showValidationErrorMessage = false;
  showCreationErrorMessage = false;
  isCreating = false;

  constructor(
    private dialogRef: MatDialogRef<EditPhotoAlbumComponent>,
    @Inject(MAT_DIALOG_DATA) public album: Album,
    private formBuilder: FormBuilder,
    private photoAlbumService: PhotoAlbumService,
    private fileUploadService: FileUploadService) {
    this.albumForm = this.formBuilder.group({
      name: [album.name, Validators.required],
      year: [album.year, Validators.required],
      author: [album.author],
      images: [album.images, Validators.required]
    });
    console.log(this.album)
    this.albumForm.valueChanges.subscribe(() => {
      this.showValidationErrorMessage = false;
      this.showCreationErrorMessage = false;
    });
  }

  add() {
    if (this.albumForm.valid) {
      this.isCreating = true;

      let album: Album = this.albumForm.value;
      album.id = this.album.id;

      this.photoAlbumService.updateAlbum(album).subscribe({
          next: () => {
            if (this.images.length > 0) {
              let imageUploads = this.images.map(image => this.fileUploadService.uploadFile('images/albums/' + album.id + '/', image));

              combineLatest(imageUploads).subscribe({
                next: () => {
                  this.isCreating = false;
                  this.dialogRef.close();
                },
                error: () => {
                  let newImages = this.images.map(image => image.name);
                  this.album.images = this.album.images.filter(image => !newImages.includes(image));
                  this.photoAlbumService.updateAlbum(this.album).subscribe({
                    next: () => {
                      this.isCreating = false;
                      this.showCreationErrorMessage = true;
                    },
                    error: () => {
                      this.isCreating = false;
                      this.showCreationErrorMessage = true;
                    }
                  });
                }
              });
            } else {
              this.isCreating = false;
              this.dialogRef.close();
            }
          },
          error: () => {
            this.isCreating = false;
            this.showCreationErrorMessage = true;
          }
        }
      )

    } else {
      this.showValidationErrorMessage = true;
    }
  }

  handleImagesInput(event: any) {
    if (event.target.files.length > 0) {
      this.images = Array.from(event.target.files);

      this.albumForm.get('images').setValue(this.album.images.concat(this.images.map(image => image.name)));
    } else {
      this.images = [];
      this.albumForm.get('images').setValue([]);
    }
  }
}

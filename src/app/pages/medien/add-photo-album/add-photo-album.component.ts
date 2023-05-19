import {Component} from '@angular/core';
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {PhotoAlbumService} from "../../../shared/services/photo-album.service";
import {Album} from "../../../shared/models/album.model";
import {FileService} from "../../../shared/services/file.service";
import {FileUploadService} from "../../../shared/services/file-upload.service";
import {combineLatest, Observable} from "rxjs";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-photo-album',
  templateUrl: './add-photo-album.component.html',
  styleUrls: ['./add-photo-album.component.scss']
})
export class AddPhotoAlbumComponent {

  images: File[] = [];
  albumForm: UntypedFormGroup;
  showValidationErrorMessage = false;
  showCreationErrorMessage = false;
  isCreating = false;

  constructor(
    private dialogRef: MatDialogRef<AddPhotoAlbumComponent>,
    private formBuilder: FormBuilder,
    private photoAlbumService: PhotoAlbumService,
    private fileUploadService: FileUploadService) {
    this.albumForm = this.formBuilder.group({
      name: ['', Validators.required],
      year: ['', Validators.required],
      author: [''],
      images: [[''], Validators.required]
    });

    this.albumForm.valueChanges.subscribe(() => {
      this.showValidationErrorMessage = false;
      this.showCreationErrorMessage = false;
    });
  }

  add() {
    if (this.albumForm.valid && this.images.length > 0) {
      this.isCreating = true;

      var album: Album = this.albumForm.value;

      this.photoAlbumService.createAlbum(album).subscribe({
          next: res => {

            let imageUploads = this.images.map(image => this.fileUploadService.uploadFile('images/albums/' + res.id + '/', image));

            combineLatest(imageUploads).subscribe({
              next: () => {
                this.isCreating = false;
                this.dialogRef.close();
              },
              error: () => {
                this.showCreationErrorMessage = true;
                this.photoAlbumService.deleteAlbum(res.id).subscribe({
                  next: () => {
                    this.isCreating = false;
                  }
                });
              }
            });
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

      this.albumForm.get('images').setValue(this.images.map(image => image.name));
    } else {
      this.images = [];
      this.albumForm.get('images').setValue([]);
    }
  }
}

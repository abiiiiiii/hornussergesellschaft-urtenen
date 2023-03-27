import {Component} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {NewsService} from "../../../shared/services/news.service";
import {FileUploadService} from "../../../shared/services/file-upload.service";
import {InternalDocumentService} from "../../../shared/services/internal-document.service";
import {News} from "../../../shared/models/news.model";
import {combineLatest, of} from "rxjs";
import {InternalDocument} from "../../../shared/models/internal-document.model";

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent {

  file: File;
  isCreating = false;
  showValidationErrorMessage = false;
  showCreationErrorMessage = false;
  form = this.formBuilder.group({
    name: ['', Validators.required],
    file: ['', Validators.required]
  });

  constructor(public dialogRef: MatDialogRef<AddDocumentComponent>,
              private formBuilder: UntypedFormBuilder,
              private internalDocumentService: InternalDocumentService,
              private fileUploadService: FileUploadService) {

    this.form.valueChanges.subscribe(() => {
      this.showCreationErrorMessage = false;
      this.showCreationErrorMessage = false;
    })
  }

  add() {
    if (this.form.valid) {
      this.isCreating = true;
      let document: InternalDocument = {
        name: this.form.get('name')?.value,
        fileName: this.form.get('file').value,
        active: true
      }

      this.internalDocumentService.createInternalDocument(document).subscribe({
        next: ref => {
          let file$ = of(null);
          if (this.file) {
            file$ = this.fileUploadService.uploadFile("pdf/internal/", this.file);
          }

          file$.subscribe({
            next: value => {
              this.isCreating = false;
              this.dialogRef.close();
            },
            error: error => {
              console.log(error);
              this.internalDocumentService.deleteInternalDocument(ref.id).subscribe();
              this.showCreationErrorMessage = true;
              this.isCreating = false;
            }
          })
        },
        error: () => {
          this.isCreating = false;
          this.showCreationErrorMessage = true;
        }
      })
    } else {
      this.showValidationErrorMessage = true;
    }
  }

  uploadDocument(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.form.get('file')?.setValue(this.file.name);
    } else {
      this.form.get('file').setValue('')
    }
  }
}

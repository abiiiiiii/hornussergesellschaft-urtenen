import {Component, Inject, Input, OnInit} from '@angular/core';
import {InternalDocument} from "../../../shared/models/internal-document.model";
import {FormBuilder, Validators} from "@angular/forms";
import {of} from "rxjs";
import {InternalDocumentService} from "../../../shared/services/internal-document.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FileUploadService} from "../../../shared/services/file-upload.service";
import {News} from "../../../shared/models/news.model";

@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.scss']
})
export class EditDocumentComponent implements OnInit {
  isUpdating = false;
  showValidationErrorMessage = false;
  showCreationErrorMessage = false;
  file: File;

  form = this.formBuilder.group({
    name: ['', Validators.required],
    file: [''],
  });

  constructor(private dialogRef: MatDialogRef<EditDocumentComponent>,
              @Inject(MAT_DIALOG_DATA) private internalDocument: InternalDocument,
              private formBuilder: FormBuilder,
              private fileUploadService: FileUploadService,
              private internalDocumentService: InternalDocumentService) {
  }

  ngOnInit(): void {
    this.form.get('name').setValue(this.internalDocument.name);
  }

  update() {
    if (this.form.valid) {
      this.isUpdating = true;
      let document: InternalDocument = {
        id: this.internalDocument.id,
        name: this.form.get('name')?.value,
        fileName: this.form.get('file').value != '' ? this.file.name : this.internalDocument.fileName
      }

      this.internalDocumentService.updateInternalDocument(document).subscribe({
        next: ref => {
          let file$ = of(null);
          if (this.file) {
            file$ = this.fileUploadService.uploadFile("pdf/internal/", this.file);
          }

          file$.subscribe({
            next: value => {
              this.isUpdating = false;
              this.dialogRef.close();
            },
            error: error => {
              console.log(error);
              this.showCreationErrorMessage = true;
              this.isUpdating = false;
            }
          })
        },
        error: () => {
          this.isUpdating = false;
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

import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {News} from "../../../../shared/models/news.model";
import {NewsService} from "../../../../shared/services/news.service";
import {combineLatest, Observable, of} from "rxjs";
import {FileUploadService} from "../../../../shared/services/file-upload.service";

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss']
})
export class EditNewsComponent implements OnInit {

  imageFile: File;
  flyerFile?: File;
  showValidationErrorMessage = false;
  showUpdateErrorMessage = false;
  newsForm: FormGroup;
  isUpdating = false;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<EditNewsComponent>,
              @Inject(MAT_DIALOG_DATA) private data: News,
              private newsService: NewsService,
              private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    this.newsForm = this.formBuilder.group({
      title: [this.data.title, Validators.required],
      text: [this.data.description, Validators.required],
      image: [''],
      flyer: ['']
    });

    this.newsForm.valueChanges.subscribe(() => {
      this.showValidationErrorMessage = false;
      this.showUpdateErrorMessage = false;
    })
  }

  update() {
    if (this.newsForm.valid) {
      this.isUpdating = true;
      const form = this.newsForm.value;
      let image$ = of(null);
      let flyer$ = of(null);
      this.data.title = this.newsForm.get('title').value;
      this.data.description = this.newsForm.get('text').value;
      if (form.image != '') {
        console.log(this.imageFile)
        this.data.image = form.image;
        image$ = this.fileUploadService.uploadFile('images/news/', this.imageFile)
      }
      if (form.flyer != '') {
        console.log(this.flyerFile)
        this.data.flyer = form.flyer;
        flyer$ = this.fileUploadService.uploadFile("pdf/news/", this.flyerFile);
      }
      const update$ = this.newsService.updateNews(this.data);

      combineLatest([image$, flyer$, update$]).subscribe(() => {
        this.isUpdating = false;
        this.newsService.load$.next(undefined);
        this.dialogRef.close();
      }, error => {
        console.log(error)
        this.isUpdating = false;
        this.showUpdateErrorMessage = true;
      })
    } else {
      this.showValidationErrorMessage = true;
    }
  }

  handleImageFileInput(event: any) {
    console.log('test');
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
      this.newsForm.get('image')?.setValue(this.imageFile?.name);
    } else {
      this.newsForm.get('image').setValue('');
    }
  }

  handleFlyerFileInput(event: any) {
    if (event.target.files.length > 0) {
      this.flyerFile = event.target.files[0];
      this.newsForm.get('flyer')?.setValue(this.flyerFile?.name);
    } else {
      this.newsForm.get('flyer').setValue('');
    }
  }

}

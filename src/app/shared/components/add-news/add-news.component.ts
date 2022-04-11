import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NewsService } from "../../services/news.service";
import { News } from "../../models/news.model";
import { FileUploadService } from "../../services/file-upload.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { combineLatest, of } from "rxjs";

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent {

  imageFile: File;
  flyerFile?: File;
  showErrorMessage = false;

  newsForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    text: ['', Validators.required],
    image: ['', Validators.required],
    flyer: [''],
  });

  constructor(public dialogRef: MatDialogRef<AddNewsComponent>,
    private formBuilder: FormBuilder,
    private newsService: NewsService,
    private fileUploadService: FileUploadService) {
    this.newsForm.valueChanges.subscribe(() => {
      this.showErrorMessage = false;
    })
  }

  add() {
    if (this.newsForm.valid) {
      let description: string[] = this.newsForm.get('text')?.value.split("\n");
        let news: News = {
          createdAt: new Date(),
          title: this.newsForm.get('title')?.value,
          description: description,
          flyer: this.newsForm.get('flyer')?.value,
          image: this.newsForm.get('image')?.value,
          active: true
        }

      this.newsService.createNews(news).subscribe(() => {
        let flyer$ = of(null);
        let image$ = this.fileUploadService.uploadFile("images/news/", this.imageFile);
        if (this.flyerFile) {
          flyer$ = this.fileUploadService.uploadFile("pdf/news/", this.flyerFile);
        }

        combineLatest([image$, flyer$]).subscribe(([image, flyer]) => {
          this.dialogRef.close();
        })
      })
    } else {
      this.showErrorMessage = true;
    }
  }

  handleImageFileInput(event: any) {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
      this.newsForm.get('image')?.setValue(this.imageFile?.name);
    }
  }

  handleFlyerFileInput(event: any) {
    if (event.target.files.length > 0) {
      this.flyerFile = event.target.files[0];
      this.newsForm.get('flyer')?.setValue(this.flyerFile?.name);
    }
  }
}

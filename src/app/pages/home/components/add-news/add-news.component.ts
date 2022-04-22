import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NewsService } from "../../../../shared/services/news.service";
import { News } from "../../../../shared/models/news.model";
import { FileUploadService } from "../../../../shared/services/file-upload.service";
import { MatDialogRef } from "@angular/material/dialog";
import { combineLatest, of } from "rxjs";

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent {

  imageFile: File;
  flyerFile?: File;
  showValidationErrorMessage = false;
  showCreationErrorMessage = false;
  isCreating = false;

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
      this.showCreationErrorMessage = false;
      this.showCreationErrorMessage = false;
    })
  }

  add() {
    if (this.newsForm.valid) {
      this.isCreating = true;
      let description: string[] = this.newsForm.get('text')?.value.split("\n");
        let news: News = {
          createdAt: new Date(),
          title: this.newsForm.get('title')?.value,
          description: description,
          flyer: this.newsForm.get('flyer')?.value,
          image: this.newsForm.get('image')?.value,
          active: true
        }

      this.newsService.createNews(news).subscribe(ref => {
        let flyer$ = of(null);
        let image$ = this.fileUploadService.uploadFile("images/news/", this.imageFile);
        if (this.flyerFile) {
          flyer$ = this.fileUploadService.uploadFile("pdf/news/", this.flyerFile);
        }

        combineLatest([image$, flyer$]).subscribe(() => {
          this.isCreating = false;
          this.newsService.load$.next(undefined);
          this.dialogRef.close();
        }, error => {
          console.log(error);
          this.newsService.deleteNews(ref.id).subscribe();
          this.showCreationErrorMessage = true;
          this.isCreating = false;
        })
      }, error => {
        console.log(error);
        this.isCreating = false;
        this.showCreationErrorMessage = true;
      })
    } else {
      this.showCreationErrorMessage = true;
    }
  }

  handleImageFileInput(event: any) {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
      this.newsForm.get('image')?.setValue(this.imageFile?.name);
    } else {
      this.newsForm.get('image').setValue('')
    }
  }

  handleFlyerFileInput(event: any) {
    if (event.target.files.length > 0) {
      this.flyerFile = event.target.files[0];
      this.newsForm.get('flyer')?.setValue(this.flyerFile?.name);
    } else {
      this.newsForm.get('flyer').setValue('')
    }
  }
}

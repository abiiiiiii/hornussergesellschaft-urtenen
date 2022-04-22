import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ClubEvent} from "../../../../shared/models/event.model";
import {EventService} from "../../../../shared/services/event.service";
import {combineLatest, of} from "rxjs";
import {FileUploadService} from "../../../../shared/services/file-upload.service";

@Component({
  selector: 'app-edit-club-event',
  templateUrl: './edit-club-event.component.html',
  styleUrls: ['./edit-club-event.component.scss']
})
export class EditClubEventComponent implements OnInit {

  imageFile: File;
  flyerFile?: File;
  showValidationErrorMessage = false;
  showUpdateErrorMessage = false;
  eventForm: FormGroup;
  isUpdating = false;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<EditClubEventComponent>,
              @Inject(MAT_DIALOG_DATA) private data: ClubEvent,
              private eventService: EventService,
              private fileUploadService: FileUploadService) {
  }

  ngOnInit(): void {
    console.log(this.data)
    this.eventForm = this.formBuilder.group({
      title: [this.data.title, Validators.required],
      text: [this.data.description, Validators.required],
      date: [new Date(this.data.date.seconds * 1000)],
      image: [''],
      flyer: ['']
    });

    this.eventForm.valueChanges.subscribe(() => {
      this.showValidationErrorMessage = false;
      this.showUpdateErrorMessage = false;
    })
  }

  update() {
    if (this.eventForm.valid) {
      this.isUpdating = true;
      const form = this.eventForm.value;
      let image$ = of(null);
      let flyer$ = of(null);
      this.data.title = this.eventForm.get('title').value;
      this.data.description = this.eventForm.get('text').value;
      this.data.date = this.eventForm.get('date').value;

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

      const update$ = this.eventService.updateEvent(this.data);

      combineLatest([image$, flyer$, update$]).subscribe(() => {
        this.isUpdating = false;
        this.eventService.load$.next(undefined);
        this.dialogRef.close();
      }, error => {
        console.log(error)
        this.isUpdating = false;
        this.showUpdateErrorMessage = true;
      });
    } else {
      this.showValidationErrorMessage = true;
    }
  }

  handleImageFileInput(event: any) {
    console.log('test');
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
      this.eventForm.get('image')?.setValue(this.imageFile?.name);
    } else {
      this.eventForm.get('image').setValue('');
    }
  }

  handleFlyerFileInput(event: any) {
    if (event.target.files.length > 0) {
      this.flyerFile = event.target.files[0];
      this.eventForm.get('flyer')?.setValue(this.flyerFile?.name);
    } else {
      this.eventForm.get('flyer').setValue('');
    }
  }

}

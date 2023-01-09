import { Component } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MatLegacyDialogRef as MatDialogRef} from "@angular/material/legacy-dialog";
import {FileUploadService} from "../../../../shared/services/file-upload.service";
import {EventService} from "../../../../shared/services/event.service";
import {combineLatest, of} from "rxjs";
import {ClubEvent} from "../../../../shared/models/event.model";

@Component({
  selector: 'app-add-club-event',
  templateUrl: './add-club-event.component.html',
  styleUrls: ['./add-club-event.component.scss']
})
export class AddClubEventComponent {

  imageFile: File;
  flyerFile?: File;
  showValidationErrorMessage = false;
  showCreationErrorMessage = false;
  isCreating = false;

  eventForm: UntypedFormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    text: ['', Validators.required],
    date: [new Date(), Validators.required],
    image: ['', Validators.required],
    flyer: [''],
  });

  constructor(public dialogRef: MatDialogRef<AddClubEventComponent>,
              private formBuilder: UntypedFormBuilder,
              private eventService: EventService,
              private fileUploadService: FileUploadService) {
    this.eventForm.valueChanges.subscribe(() => {
      this.showValidationErrorMessage = false;
      this.showCreationErrorMessage = false;
    })
  }

  add() {
    if (this.eventForm.valid) {
      this.isCreating = true;
      let description: string[] = this.eventForm.get('text')?.value.split("\n");
      let event: ClubEvent = {
        date: this.eventForm.get('date').value,
        title: this.eventForm.get('title').value,
        description: description,
        flyer: this.eventForm.get('flyer')?.value,
        image: this.eventForm.get('image').value,
        active: true
      }

      this.eventService.createEvent(event).subscribe(ref => {
        let flyer$ = of(null);
        let image$ = this.fileUploadService.uploadFile("images/news/", this.imageFile);
        if (this.flyerFile) {
          flyer$ = this.fileUploadService.uploadFile("pdf/news/", this.flyerFile);
        }

        combineLatest([image$, flyer$]).subscribe(() => {
          this.isCreating = false;
          this.eventService.load$.next(undefined)
          this.dialogRef.close();
        }, error => {
          console.log(error);
          this.eventService.deleteEvent(ref.id).subscribe();
          this.isCreating = false;
          this.showCreationErrorMessage = true;
        })
      }, error => {
        console.log(error);
        this.isCreating = false;
        this.showCreationErrorMessage = true;
      })
    } else {
      this.showValidationErrorMessage = true;
    }
  }

  handleImageFileInput(event: any) {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
      this.eventForm.get('image')?.setValue(this.imageFile?.name);
    }
  }

  handleFlyerFileInput(event: any) {
    if (event.target.files.length > 0) {
      this.flyerFile = event.target.files[0];
      this.eventForm.get('flyer')?.setValue(this.flyerFile?.name);
    }
  }
}

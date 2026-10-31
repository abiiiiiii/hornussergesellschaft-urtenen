import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditSponsorComponent } from './edit-sponsor.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('EditSponsorComponent', () => {
  let component: EditSponsorComponent;
  let fixture: ComponentFixture<EditSponsorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSponsorComponent, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } },
        { provide: MAT_DIALOG_DATA, useValue: { sponsor: undefined } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

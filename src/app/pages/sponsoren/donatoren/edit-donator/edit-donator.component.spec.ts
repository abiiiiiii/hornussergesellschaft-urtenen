import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditDonatorComponent } from './edit-donator.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('EditDonatorComponent', () => {
  let component: EditDonatorComponent;
  let fixture: ComponentFixture<EditDonatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDonatorComponent, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } },
        { provide: MAT_DIALOG_DATA, useValue: { donator: undefined } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDonatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

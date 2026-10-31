import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditBoardMemberComponent } from './edit-board-member.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('EditBoardMemberComponent', () => {
  let component: EditBoardMemberComponent;
  let fixture: ComponentFixture<EditBoardMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBoardMemberComponent, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } },
        { provide: MAT_DIALOG_DATA, useValue: { target: 'board', member: undefined } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBoardMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

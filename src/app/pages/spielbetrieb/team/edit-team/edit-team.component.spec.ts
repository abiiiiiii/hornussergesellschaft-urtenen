import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditTeamComponent } from './edit-team.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('EditTeamComponent', () => {
  let component: EditTeamComponent;
  let fixture: ComponentFixture<EditTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTeamComponent, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            team: {
              id: '1',
              name: 'A-Mannschaft',
              image: 'a_mannschaft.jpg',
              players: [{ name: 'Muster', preName: 'Beat' }],
              games: []
            }
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

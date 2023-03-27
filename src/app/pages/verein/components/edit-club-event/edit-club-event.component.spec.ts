import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClubEventComponent } from './edit-club-event.component';

describe('EditNewsComponent', () => {
  let component: EditClubEventComponent;
  let fixture: ComponentFixture<EditClubEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditClubEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClubEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

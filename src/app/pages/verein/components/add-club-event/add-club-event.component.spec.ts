import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClubEventComponent } from './add-club-event.component';

describe('AddClubEventComponent', () => {
  let component: AddClubEventComponent;
  let fixture: ComponentFixture<AddClubEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClubEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClubEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

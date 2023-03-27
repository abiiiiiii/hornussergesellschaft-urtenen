import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSponsorsComponent } from './main-sponsors.component';

describe('GoldSponsorsComponent', () => {
  let component: MainSponsorsComponent;
  let fixture: ComponentFixture<MainSponsorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSponsorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSponsorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

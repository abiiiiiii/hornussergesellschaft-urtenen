import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedienComponent } from './medien.component';

describe('MedienComponent', () => {
  let component: MedienComponent;
  let fixture: ComponentFixture<MedienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnComponent } from './inn.component';

describe('InnComponent', () => {
  let component: InnComponent;
  let fixture: ComponentFixture<InnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

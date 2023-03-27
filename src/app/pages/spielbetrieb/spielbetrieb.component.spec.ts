import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpielbetriebComponent } from './spielbetrieb.component';

describe('SpielbetriebComponent', () => {
  let component: SpielbetriebComponent;
  let fixture: ComponentFixture<SpielbetriebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpielbetriebComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpielbetriebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

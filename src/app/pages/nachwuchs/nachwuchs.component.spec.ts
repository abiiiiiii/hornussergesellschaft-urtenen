import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NachwuchsComponent } from './nachwuchs.component';

describe('NachwuchsComponent', () => {
  let component: NachwuchsComponent;
  let fixture: ComponentFixture<NachwuchsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NachwuchsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NachwuchsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

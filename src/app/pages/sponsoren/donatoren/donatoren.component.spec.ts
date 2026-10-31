import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DonatorenComponent } from './donatoren.component';

describe('DonatorenComponent', () => {
  let component: DonatorenComponent;
  let fixture: ComponentFixture<DonatorenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonatorenComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonatorenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

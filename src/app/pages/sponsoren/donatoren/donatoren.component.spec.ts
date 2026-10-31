import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DonatorenComponent } from './donatoren.component';
import { DonatorService } from '../../../shared/services/donator.service';
import { of } from 'rxjs';
import { Donator } from '../../../shared/models/donator.model';

describe('DonatorenComponent', () => {
  let component: DonatorenComponent;
  let fixture: ComponentFixture<DonatorenComponent>;
  let donatorService: DonatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonatorenComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonatorenComponent);
    component = fixture.componentInstance;
    donatorService = TestBed.inject(DonatorService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should separate company and private donators and attach imageUrl$ for images', () => {
    const mockDonators: Donator[] = [
      { id: '1', name: 'Firma AG', category: 'COMPANY', image: 'firma.png' },
      { id: '2', name: 'Max Muster', category: 'PRIVATE' }
    ];
    spyOn(donatorService, 'getDonators').and.returnValue(of(mockDonators));
    spyOn(donatorService, 'getDonatorImage').and.returnValue(of('http://example.com/firma.png'));

    component.loadDonators();

    expect(component.companyDonators.length).toBe(1);
    expect(component.companyDonators[0].name).toBe('Firma AG');
    expect(component.companyDonators[0].imageUrl$).toBeDefined();
    expect(component.privateDonators.length).toBe(1);
    expect(component.privateDonators[0].name).toBe('Max Muster');
  });
});


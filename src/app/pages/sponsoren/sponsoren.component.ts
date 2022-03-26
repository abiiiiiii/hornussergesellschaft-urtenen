import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Sponsor} from "../../shared/models/sponsor.model";
import {SponsorType} from "../../shared/enums/sponsor-type.enum";
import {SponsorService} from "../../shared/services/sponsor.service";

@Component({
  selector: 'app-sponsoren',
  templateUrl: './sponsoren.component.html',
  styleUrls: ['./sponsoren.component.scss']
})
export class SponsorenComponent implements AfterViewInit {

  donators: Sponsor[] = [];
  sponsors: Sponsor[] = [];
  mainSponsors: Sponsor[] = [];

  constructor(private sponsorService: SponsorService) {
    this.sponsorService.getSponsorsByType(SponsorType.MAIN_SPONSOR).subscribe(sponsors => {
      sponsors.forEach(doc => {
        let sponsor = doc.data() as Sponsor;
        sponsor.id = doc.id
        this.mainSponsors.push(sponsor)
      })
    });
    this.sponsorService.getSponsorsByType(SponsorType.SPONSOR).subscribe(sponsors => {
      sponsors.forEach(doc => {
        let sponsor = doc.data() as Sponsor;
        sponsor.id = doc.id
        this.sponsors.push(sponsor)
      })
    });
    this.sponsorService.getSponsorsByType(SponsorType.DONATOR).subscribe(sponsors => {
      sponsors.forEach(doc => {
        let sponsor = doc.data() as Sponsor;
        sponsor.id = doc.id
        this.donators.push(sponsor)
      })
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      let headerHeight = document.getElementById('header')?.getBoundingClientRect().height
      if (headerHeight && window.scrollY == 0) {
        window.scrollBy(0, headerHeight);
      }
    }, 100)
  }

}

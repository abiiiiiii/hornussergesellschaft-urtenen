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
      this.mainSponsors = sponsors;
    });
    this.sponsorService.getSponsorsByType(SponsorType.SPONSOR).subscribe(sponsors => {
      this.sponsors = sponsors;
    });
    this.sponsorService.getSponsorsByType(SponsorType.DONATOR).subscribe(sponsors => {
      this.donators = sponsors;
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

import {Component, OnInit} from '@angular/core';
import {SponsorService} from "../../../shared/services/sponsor.service";
import {SponsorType} from "../../../shared/enums/sponsor-type.enum";
import {Sponsor} from "../../../shared/models/sponsor.model";

@Component({
  selector: 'app-main-sponsors',
  templateUrl: './main-sponsors.component.html',
  styleUrls: ['./main-sponsors.component.scss']
})
export class MainSponsorsComponent implements OnInit {

  sponsors: Sponsor[] = [];

  constructor(private sponsorService: SponsorService) {
    this.sponsorService.getSponsorsByType(SponsorType.MAIN_SPONSOR).subscribe(sponsors => {
      this.sponsors = sponsors;
    })
  }

  ngOnInit(): void {
  }

}

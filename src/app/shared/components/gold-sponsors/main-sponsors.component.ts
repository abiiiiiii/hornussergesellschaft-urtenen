import {Component, OnInit} from '@angular/core';
import {SponsorService} from "../../services/sponsor.service";
import {SponsorType} from "../../enums/sponsor-type.enum";
import {Sponsor} from "../../models/sponsor.model";

@Component({
  selector: 'app-main-sponsors',
  templateUrl: './main-sponsors.component.html',
  styleUrls: ['./main-sponsors.component.scss']
})
export class MainSponsorsComponent implements OnInit {

  sponsors: Sponsor[] = [];

  constructor(private sponsorService: SponsorService) {
    this.sponsorService.getSponsorsByType(SponsorType.MAIN_SPONSOR).subscribe(sponsors => {
      sponsors.forEach(doc => {
        let sponsor = doc.data() as Sponsor;
        sponsor.id = doc.id
        this.sponsors.push(sponsor);
      })
    })
  }

  ngOnInit(): void {
  }

}

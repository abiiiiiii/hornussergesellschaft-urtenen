import {Component, Input, OnInit} from '@angular/core';
import {Sponsor} from "../../models/sponsor.model";
import {SponsorService} from "../../services/sponsor.service";
import {of} from "rxjs";

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.scss']
})
export class SponsorComponent implements OnInit {

  @Input() column = false;
  @Input() sponsor?: Sponsor;
  imageUrl$ = of('');

  constructor(private sponsorService: SponsorService) { }

  ngOnInit(): void {
    if (this.sponsor) {
      this.imageUrl$ = this.sponsorService.getSponsorImage(this.sponsor.image);
    }
  }

}

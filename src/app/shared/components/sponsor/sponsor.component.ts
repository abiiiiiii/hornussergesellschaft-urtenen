import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Sponsor } from "../../models/sponsor.model";
import { SponsorService } from "../../services/sponsor.service";
import { of } from "rxjs";
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [AsyncPipe, MatIconModule]
})
export class SponsorComponent implements OnInit {
  @Input() column = false;
  @Input() sponsor?: Sponsor;
  @Input() canEdit = false;

  @Output() edit = new EventEmitter<Sponsor>();
  @Output() delete = new EventEmitter<Sponsor>();

  imageUrl$ = of('');

  constructor(private sponsorService: SponsorService) { }

  ngOnInit(): void {
    if (this.sponsor) {
      this.imageUrl$ = this.sponsorService.getSponsorImage(this.sponsor.image);
    }
  }

  onEdit(): void {
    if (this.sponsor) {
      this.edit.emit(this.sponsor);
    }
  }

  onDelete(): void {
    if (this.sponsor) {
      this.delete.emit(this.sponsor);
    }
  }
}

import { AfterViewInit, Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { AuthService } from "../../core/services/auth.service";
import { Router } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { AddClubEventComponent } from "./events/event/add-club-event/add-club-event.component";
import { MatIcon } from '@angular/material/icon';
import { EventsComponent } from './events/events.component';
import { BoardOfManagementComponent } from './board-of-management/board-of-management.component';
import { ContactComponent } from './contact/contact.component';
import { PlaymakerComponent } from './playmaker/playmaker.component';
import { TimelineComponent } from './timeline/timeline.component';
import { InnComponent } from './inn/inn.component';
import { ApprochComponent } from './approch/approch.component';

@Component({
    selector: 'app-verein',
    templateUrl: './verein.component.html',
    styleUrls: ['./verein.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatIcon, EventsComponent, BoardOfManagementComponent, ContactComponent, PlaymakerComponent, TimelineComponent, InnComponent, ApprochComponent]
})
export class VereinComponent implements AfterViewInit {

  public readonly authService = inject(AuthService);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  ngAfterViewInit() {
    setTimeout(() => {
      let fragment = this.router.url.split('#')[1];
      if (fragment) {
        document.getElementById(fragment).scrollIntoView();
      }
    }, 200);
  }

  addEvent() {
    this.dialog.open(AddClubEventComponent, { data: { showEventCheckbox: false, isEvent: true } });
  }

  goTo(id: string) {
    document.getElementById(id).scrollIntoView({
      behavior: 'smooth'
    });
  }

}

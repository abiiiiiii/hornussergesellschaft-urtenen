import { AfterViewInit, Component } from '@angular/core';
import { AuthService } from "../../core/services/auth.service";
import { Router } from '@angular/router';
import {AddClubEventComponent} from "./components/add-club-event/add-club-event.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-verein',
  templateUrl: './verein.component.html',
  styleUrls: ['./verein.component.scss']
})
export class VereinComponent implements AfterViewInit {

  constructor(public authService: AuthService, private dialog: MatDialog, private router: Router) { }

  ngAfterViewInit() {
    setTimeout(() => {
      let fragment = this.router.url.split('#')[1];
      if (fragment) {
        document.getElementById(fragment).scrollIntoView();
      }
    }, 200)
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

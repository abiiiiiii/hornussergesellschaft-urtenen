import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from "../../core/services/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { AddNewsComponent } from "../../shared/components/add-news/add-news.component";
import { ActivatedRoute, Router } from '@angular/router';

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
    }, 100)
  }

  addEvent() {
    this.dialog.open(AddNewsComponent, { data: { showEventCheckbox: false, isEvent: true } })
  }

  goTo(id: string) {
    document.getElementById(id).scrollIntoView({
      behavior: 'smooth'
    });
  }

}

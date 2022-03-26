import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {AddNewsComponent} from "../../shared/components/add-news/add-news.component";

@Component({
  selector: 'app-verein',
  templateUrl: './verein.component.html',
  styleUrls: ['./verein.component.scss']
})
export class VereinComponent implements AfterViewInit {

  constructor(public authService: AuthService, private dialog: MatDialog) { }

  ngAfterViewInit() {
    setTimeout(() => {
      let headerHeight = document.getElementById('header')?.getBoundingClientRect().height
      if (headerHeight && window.scrollY == 0) {
        window.scrollBy(0, headerHeight - 150);
      }
    }, 100)
  }

  addEvent() {
    this.dialog.open(AddNewsComponent, {data: {showEventCheckbox: false, isEvent: true}})
  }

}

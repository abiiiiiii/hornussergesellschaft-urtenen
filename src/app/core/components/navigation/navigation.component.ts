import {Component, HostListener, OnInit} from '@angular/core';
import {fromEvent} from "rxjs";
import {throttle, throttleTime} from "rxjs/operators";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  hamOpen = false;
  backFromCross = false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  handleHamburgerMenu(): void {
    if (this.hamOpen) {
      this.backFromCross = true;
      this.hamOpen = false
    }  else {
      this.hamOpen = true;
      this.backFromCross = false;
    }
  }

  logout(): void {
    this.authService.logout().subscribe(() => console.log("Logged out"));
  }

}

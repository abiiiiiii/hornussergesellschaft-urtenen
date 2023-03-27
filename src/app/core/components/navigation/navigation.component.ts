import {Component, HostListener, OnInit} from '@angular/core';
import {fromEvent} from "rxjs";
import {throttle, throttleTime} from "rxjs/operators";
import {AuthService} from "../../services/auth.service";
import {NavigationService} from "../../../shared/services/navigation.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(public authService: AuthService, public navigationService: NavigationService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout().subscribe(() => console.log("Logged out"));
  }

}

import {Component, OnInit, ChangeDetectionStrategy, inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {NavigationService} from "../../../shared/services/navigation.service";
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink, RouterLinkActive]
})
export class NavigationComponent implements OnInit {

  public readonly authService = inject(AuthService);
  public readonly navigationService = inject(NavigationService);

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout().subscribe(() => console.log("Logged out"));
  }

}

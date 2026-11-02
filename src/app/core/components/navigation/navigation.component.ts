import {Component, OnInit, ChangeDetectionStrategy, inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {NavigationService} from "../../../shared/services/navigation.service";
import {ProgrammService} from "../../../shared/services/programm.service";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink, RouterLinkActive, AsyncPipe]
})
export class NavigationComponent implements OnInit {

  public readonly authService = inject(AuthService);
  public readonly navigationService = inject(NavigationService);
  private readonly programmService = inject(ProgrammService);

  jahresprogrammUrl$: Observable<string | null>;
  nachwuchsJahresprogrammUrl$: Observable<string | null>;

  ngOnInit(): void {
    this.jahresprogrammUrl$ = this.programmService.getJahresprogrammUrl().pipe(
      catchError(() => of(null))
    );
    this.nachwuchsJahresprogrammUrl$ = this.programmService.getNachwuchsJahresprogrammUrl().pipe(
      catchError(() => of(null))
    );
  }

  logout(): void {
    this.authService.logout().subscribe(() => console.log("Logged out"));
  }

}

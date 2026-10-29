import {Component, ChangeDetectionStrategy} from '@angular/core';
import {NavigationService} from "../../../shared/services/navigation.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class HeaderComponent {

  constructor(public navigationService: NavigationService) {
  }

}

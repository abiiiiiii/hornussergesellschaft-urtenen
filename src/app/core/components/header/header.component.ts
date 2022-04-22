import {Component} from '@angular/core';
import {NavigationService} from "../../../shared/services/navigation.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public navigationService: NavigationService) {
  }

}

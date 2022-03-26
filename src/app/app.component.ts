import {Component} from '@angular/core';
import {AuthService} from "./core/services/auth.service";
import {FileService} from "./shared/services/file.service";
import {NewsService} from "./shared/services/news.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hornussergesellschaft Urtenen';

  constructor(public authService: AuthService, private imageService: FileService) {
    this.authService.checkIfUserIsLoggedIn();
  }
}

import { Component } from '@angular/core';
import {AuthService} from "./core/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hornussergesellschaft-urtenen';

  constructor(private authService: AuthService) {
    this.authService.login('hornusserurtenen@gmail.com', 'shotmisti').then(res => {
      console.log(res.user?.uid)
    });
  }
}

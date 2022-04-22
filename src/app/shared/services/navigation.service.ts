import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  hamOpen = false;
  backFromCross = false;

  constructor() { }

  handleHamburgerMenu(): void {
    if (this.hamOpen) {
      this.backFromCross = true;
      this.hamOpen = false
    }  else {
      this.hamOpen = true;
      this.backFromCross = false;
    }
  }
}

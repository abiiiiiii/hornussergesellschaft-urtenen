import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goTo(fragment: string) {
    if (this.router.url.includes('gesellschaft')) {
      document.getElementById(fragment).scrollIntoView({
        behavior: 'smooth'
      });
    } else {
      this.router.navigate(['gesellschaft'], {fragment})
    }
  }

}

import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "./core/services/auth.service";
import {FileService} from "./shared/services/file.service";
import {NewsService} from "./shared/services/news.service";
import {fromEvent} from "rxjs";
import {throttleTime} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('content') content: ElementRef<HTMLDivElement>;
  @ViewChild('page') page: ElementRef<HTMLDivElement>;

  title = 'Hornussergesellschaft Urtenen';
  showScrollUpButton = false;


  constructor(public authService: AuthService, private imageService: FileService) {
    this.authService.checkIfUserIsLoggedIn();
  }

  ngAfterViewInit() {
    fromEvent(this.content.nativeElement, 'scroll').pipe(
      throttleTime(100)
    ).subscribe(() => {
      this.showScrollUpButton = this.content.nativeElement.scrollTop > 400;
    })
    fromEvent(this.page.nativeElement, 'scroll').pipe(
      throttleTime(100)
    ).subscribe(() => {
      this.showScrollUpButton = this.page.nativeElement.scrollTop > 200;
    })
  }

  scrollToTop() {
    this.content.nativeElement.scrollTo({top: 0, behavior: 'smooth'})
    this.page.nativeElement.scrollTo({top: 0, behavior: 'smooth'})
  }
}

import {AfterViewInit, Component, ElementRef, ViewChild, ChangeDetectionStrategy, inject} from '@angular/core';
import {AuthService} from "./core/services/auth.service";
import {FileService} from "./shared/services/file.service";
import {fromEvent} from "rxjs";
import { NavigationComponent } from './core/components/navigation/navigation.component';
import { HeaderComponent } from './core/components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './core/components/footer/footer.component';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NavigationComponent, HeaderComponent, RouterOutlet, FooterComponent, MatIcon]
})
export class AppComponent implements AfterViewInit {

  @ViewChild('content') content: ElementRef<HTMLDivElement>;
  @ViewChild('page') page: ElementRef<HTMLDivElement>;

  title = 'Hornussergesellschaft Urtenen';
  showScrollUpButton = false;

  public readonly authService = inject(AuthService);

  ngAfterViewInit() {
    fromEvent(this.content.nativeElement, 'scroll').subscribe(() => {
      this.showScrollUpButton = this.content.nativeElement.scrollTop > 400;
    })
    fromEvent(this.page.nativeElement, 'scroll').subscribe(() => {
      this.showScrollUpButton = this.page.nativeElement.scrollTop > 200;
    })
  }

  scrollToTop() {
    this.content.nativeElement.scrollTo({top: 0, behavior: 'smooth'})
    this.page.nativeElement.scrollTo({top: 0, behavior: 'smooth'})
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { LoginComponent } from './core/components/login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavigationComponent } from './core/components/navigation/navigation.component';
import { HeaderComponent } from './core/components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { VereinComponent } from './pages/verein/verein.component';
import { SpielbetriebComponent } from './pages/spielbetrieb/spielbetrieb.component';
import { MedienComponent } from './pages/medien/medien.component';
import { SponsorenComponent } from './pages/sponsoren/sponsoren.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { ContactComponent } from './shared/components/contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventComponent } from './shared/components/event/event.component';
import { NewsComponent } from './shared/components/news/news.component';
import { BoardOfManagementComponent } from './shared/components/board-of-management/board-of-management.component';
import { PlaymakerComponent } from './shared/components/playmaker/playmaker.component';
import { TimelineComponent } from './shared/components/timeline/timeline.component';
import { InnComponent } from './shared/components/inn/inn.component';
import { ApprochComponent } from './shared/components/approch/approch.component';
import { ArchiveComponent } from './shared/components/archive/archive.component';
import { TeamComponent } from './shared/components/team/team.component';
import { TeamListComponent } from './shared/components/team-list/team-list.component';
import { ResultComponent } from './shared/components/result/result.component';
import { SponsorComponent } from './shared/components/sponsor/sponsor.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSliderModule } from "@angular/material/slider";
import { MatButtonModule } from "@angular/material/button";
import { GameListComponent } from './shared/components/game-list/game-list.component';
import { CustomDatePipe } from './shared/pipes/custom-date.pipe';
import { DatePipe } from "@angular/common";
import { MainSponsorsComponent } from './shared/components/gold-sponsors/main-sponsors.component';
import { LatestGamesComponent } from './shared/components/latest-games/latest-games.component';
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { AddNewsComponent } from './shared/components/add-news/add-news.component';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { AddResultComponent } from './shared/components/add-result/add-result.component';
import { MatSelectModule } from "@angular/material/select";
import { MatNativeDateModule, MatOptionModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BoardMemberComponent } from './shared/components/board-member/board-member.component';
import { AddClubEventComponent } from './shared/components/add-club-event/add-club-event.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    HeaderComponent,
    HomeComponent,
    VereinComponent,
    SpielbetriebComponent,
    MedienComponent,
    SponsorenComponent,
    FooterComponent,
    ContactComponent,
    EventComponent,
    NewsComponent,
    BoardOfManagementComponent,
    PlaymakerComponent,
    TimelineComponent,
    InnComponent,
    ApprochComponent,
    ArchiveComponent,
    TeamComponent,
    TeamListComponent,
    ResultComponent,
    SponsorComponent,
    GameListComponent,
    CustomDatePipe,
    MainSponsorsComponent,
    LatestGamesComponent,
    AddNewsComponent,
    AddResultComponent,
    BoardMemberComponent,
    AddClubEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule
  ],
  providers: [DatePipe, MatIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule { }

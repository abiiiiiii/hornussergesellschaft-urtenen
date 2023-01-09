import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from "../environments/environment";
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
import { ContactComponent } from './pages/verein/components/contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventsComponent } from './pages/verein/components/events/events.component';
import { NewsComponent } from './pages/home/components/news/news.component';
import { BoardOfManagementComponent } from './pages/verein/components/board-of-management/board-of-management.component';
import { PlaymakerComponent } from './pages/verein/components/playmaker/playmaker.component';
import { TimelineComponent } from './pages/verein/components/timeline/timeline.component';
import { InnComponent } from './pages/verein/components/inn/inn.component';
import { ApprochComponent } from './pages/verein/components/approch/approch.component';
import { TeamComponent } from './pages/spielbetrieb/components/team/team.component';
import { TeamListComponent } from './pages/spielbetrieb/components/team-list/team-list.component';
import { ResultComponent } from './shared/components/result/result.component';
import { SponsorComponent } from './shared/components/sponsor/sponsor.component';
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacySliderModule as MatSliderModule } from "@angular/material/legacy-slider";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { GameListComponent } from './pages/spielbetrieb/components/game-list/game-list.component';
import { CustomDatePipe } from './shared/pipes/custom-date.pipe';
import { DatePipe } from "@angular/common";
import { MainSponsorsComponent } from './pages/home/components/gold-sponsors/main-sponsors.component';
import { LatestGamesComponent } from './pages/home/components/latest-games/latest-games.component';
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { AddNewsComponent } from './pages/home/components/add-news/add-news.component';
import { MatLegacyCheckboxModule as MatCheckboxModule } from "@angular/material/legacy-checkbox";
import { AddResultComponent } from './pages/spielbetrieb/components/add-result/add-result.component';
import { MatLegacySelectModule as MatSelectModule } from "@angular/material/legacy-select";
import { MatNativeDateModule } from "@angular/material/core";
import { MatLegacyOptionModule as MatOptionModule } from "@angular/material/legacy-core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { BoardMemberComponent } from './pages/verein/components/board-member/board-member.component';
import { AddClubEventComponent } from './pages/verein/components/add-club-event/add-club-event.component';
import {EventComponent} from "./pages/verein/components/event/event.component";
import { EditNewsComponent } from './pages/home/components/edit-news/edit-news.component';
import {EditClubEventComponent} from "./pages/verein/components/edit-club-event/edit-club-event.component";
import {EditResultComponent} from "./pages/spielbetrieb/components/edit-result/edit-result.component";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";

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
    EventsComponent,
    NewsComponent,
    BoardOfManagementComponent,
    PlaymakerComponent,
    TimelineComponent,
    InnComponent,
    ApprochComponent,
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
    AddClubEventComponent,
    EventComponent,
    EditNewsComponent,
    EditClubEventComponent,
    EditResultComponent
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

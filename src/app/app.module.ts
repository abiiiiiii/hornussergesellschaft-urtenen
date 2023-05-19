import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {environment} from "../environments/environment";
import {LoginComponent} from './core/components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NavigationComponent} from './core/components/navigation/navigation.component';
import {HeaderComponent} from './core/components/header/header.component';
import {HomeComponent} from './pages/home/home.component';
import {VereinComponent} from './pages/verein/verein.component';
import {SpielbetriebComponent} from './pages/spielbetrieb/spielbetrieb.component';
import {MedienComponent} from './pages/medien/medien.component';
import {SponsorenComponent} from './pages/sponsoren/sponsoren.component';
import {FooterComponent} from './core/components/footer/footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NewsComponent} from './pages/home/news/news.component';

import {TeamListComponent} from './pages/spielbetrieb/team-list/team-list.component';
import {ResultComponent} from './shared/components/result/result.component';
import {SponsorComponent} from './shared/components/sponsor/sponsor.component';
import {GameListComponent} from './pages/spielbetrieb/game-list/game-list.component';
import {DatePipe} from "@angular/common";
import {MainSponsorsComponent} from './pages/home/gold-sponsors/main-sponsors.component';
import {LatestGamesComponent} from './pages/home/latest-games/latest-games.component';
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {AddNewsComponent} from './pages/home/news/add-news/add-news.component';
import {AddResultComponent} from './shared/components/result/add-result/add-result.component';
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {EditNewsComponent} from './pages/home/news/edit-news/edit-news.component';
import {EditResultComponent} from "./shared/components/result/edit-result/edit-result.component";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import { MemberComponent } from './pages/member/member.component';
import { AddDocumentComponent } from './pages/member/add-document/add-document.component';
import { EditDocumentComponent } from './pages/member/edit-document/edit-document.component';
import {TeamComponent} from "./pages/spielbetrieb/team/team.component";
import {ContactComponent} from "./pages/verein/contact/contact.component";
import {EventsComponent} from "./pages/verein/events/events.component";
import {BoardOfManagementComponent} from "./pages/verein/board-of-management/board-of-management.component";
import {PlaymakerComponent} from "./pages/verein/playmaker/playmaker.component";
import {TimelineComponent} from "./pages/verein/timeline/timeline.component";
import {InnComponent} from "./pages/verein/inn/inn.component";
import {ApprochComponent} from "./pages/verein/approch/approch.component";
import {BoardMemberComponent} from "./pages/verein/board-member/board-member.component";
import {AddClubEventComponent} from "./pages/verein/events/event/add-club-event/add-club-event.component";
import {EventComponent} from "./pages/verein/events/event/event.component";
import {EditClubEventComponent} from "./pages/verein/events/event/edit-club-event/edit-club-event.component";
import { PhotoAlbumComponent } from './pages/medien/photo-album/photo-album.component';
import {NgxMasonryModule} from "ngx-masonry";
import { PhotoLightboxComponent } from './pages/medien/photo-album/photo-lightbox/photo-lightbox.component';

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
    MainSponsorsComponent,
    LatestGamesComponent,
    AddNewsComponent,
    AddResultComponent,
    BoardMemberComponent,
    AddClubEventComponent,
    EventComponent,
    EditNewsComponent,
    EditClubEventComponent,
    EditResultComponent,
    MemberComponent,
    AddDocumentComponent,
    EditDocumentComponent,
    PhotoAlbumComponent,
    PhotoLightboxComponent
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
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatDialogModule,
    NgxMasonryModule
  ],
  providers: [DatePipe, MatIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule {
}

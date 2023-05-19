import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {VereinComponent} from "./pages/verein/verein.component";
import {MedienComponent} from "./pages/medien/medien.component";
import {SponsorenComponent} from "./pages/sponsoren/sponsoren.component";
import {SpielbetriebComponent} from "./pages/spielbetrieb/spielbetrieb.component";
import {LoginComponent} from "./core/components/login/login.component";
import {GameListComponent} from "./pages/spielbetrieb/game-list/game-list.component";
import {MemberComponent} from "./pages/member/member.component";
import {PhotoAlbumComponent} from "./pages/medien/photo-album/photo-album.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'gesellschaft',
    component: VereinComponent,
    pathMatch: 'full'
  },
  {
    path: 'photos',
    component: MedienComponent,
    pathMatch: 'full',
  },
  {
    path: 'photos/:id',
    component: PhotoAlbumComponent,
    pathMatch: 'full',
  },
  {
    path: 'sponsoren',
    component: SponsorenComponent,
    pathMatch: 'full'
  },
  {
    path: 'spielbetrieb',
    component: SpielbetriebComponent,
    pathMatch: 'full'
  },
  {
    path: 'spielbetrieb/:id',
    component: GameListComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'member',
    component: MemberComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

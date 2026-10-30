// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { signal } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';

import { AuthService } from './app/core/services/auth.service';
import { NewsService } from './app/shared/services/news.service';
import { GameService } from './app/shared/services/game.service';
import { TeamService } from './app/shared/services/team.service';
import { BoardService } from './app/shared/services/board.service';
import { EventService } from './app/shared/services/event.service';
import { FileService } from './app/shared/services/file.service';
import { FileUploadService } from './app/shared/services/file-upload.service';
import { InternalDocumentService } from './app/shared/services/internal-document.service';
import { PhotoAlbumService } from './app/shared/services/photo-album.service';
import { ResultService } from './app/shared/services/result.service';
import { SponsorService } from './app/shared/services/sponsor.service';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: false }
}
);

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      provideNativeDateAdapter(),
      {
        provide: AuthService,
        useValue: {
          currentUser: signal(null),
          login: () => of({} as any),
          logout: () => of(undefined),
          getUserRole: () => of(undefined)
        }
      },
      {
        provide: NewsService,
        useValue: {
          load$: new BehaviorSubject(undefined),
          getAllNews: () => of([]),
          getNewsImage: () => of(''),
          getNewsFile: () => of(''),
          updateNews: () => of(undefined),
          deleteNews: () => of(undefined),
          createNews: () => of({} as any)
        }
      },
      {
        provide: GameService,
        useValue: {
          getGameList: () => of(''),
          getGameReport: () => of(''),
          getLatestGames: () => of([]),
          getGame: () => of(undefined),
          createGame: () => of({} as any),
          updateGame: () => of(undefined),
          deleteGame: () => of(undefined)
        }
      },
      {
        provide: TeamService,
        useValue: {
          load$: new BehaviorSubject(undefined),
          getSeniorTeams: () => of([]),
          getTeamByName: () => of({ id: '1', name: 'Urtenen', games: [], players: [], image: 'test.jpg' } as any),
          getTeamImage: () => of(''),
          createTeam: () => Promise.resolve({} as any),
          updateTeam: () => of(undefined),
          deleteTeam: () => Promise.resolve()
        }
      },
      {
        provide: BoardService,
        useValue: {
          getAllBoardMembers: () => of([]),
          getPlaymaker: () => of(undefined),
          getBoardMemberImage: () => of(''),
          createBoardMember: () => Promise.resolve({} as any),
          updateBoardMember: () => Promise.resolve(),
          deleteBoardMember: () => Promise.resolve()
        }
      },
      {
        provide: EventService,
        useValue: {
          load$: new BehaviorSubject(undefined),
          getAllEvents: () => of([]),
          createEvent: () => of({} as any),
          updateEvent: () => of(undefined),
          deleteEvent: () => of(undefined)
        }
      },
      {
        provide: FileService,
        useValue: {
          getImage: () => of(''),
          getFile: () => of(''),
          delete: () => of(undefined)
        }
      },
      {
        provide: FileUploadService,
        useValue: {
          uploadPercentage: of(100),
          uploadFile: () => of({} as any)
        }
      },
      {
        provide: InternalDocumentService,
        useValue: {
          getAllInternalDocuments: () => of([]),
          getInternalDocumentFile: () => of(''),
          createInternalDocument: () => of({} as any),
          updateInternalDocument: () => of(undefined),
          deleteInternalDocument: () => of(undefined)
        }
      },
      {
        provide: PhotoAlbumService,
        useValue: {
          getAllAlbums: () => of([{ id: '1', name: 'Test', year: 2026, images: [] }] as any),
          getAlbumById: () => of({ id: '1', name: 'Test', year: 2026, images: [] } as any),
          createAlbum: () => of({} as any),
          updateAlbum: () => of(undefined),
          deleteAlbum: () => of(undefined)
        }
      },
      {
        provide: ResultService,
        useValue: {
          getAllResults: () => of([]),
          createResult: () => Promise.resolve({} as any),
          updateResult: () => Promise.resolve(),
          deleteResult: () => Promise.resolve()
        }
      },
      {
        provide: SponsorService,
        useValue: {
          getSponsorImage: () => of(''),
          getSponsorsByType: () => of([]),
          createSponsor: () => Promise.resolve({} as any),
          updateSponsor: () => Promise.resolve(),
          deleteSponsor: () => Promise.resolve()
        }
      },
      { provide: MatDialogRef, useValue: { close: () => {}, afterClosed: () => of(undefined) } },
      {
        provide: MAT_DIALOG_DATA,
        useValue: {
          id: '1',
          title: 'Test',
          description: ['Test'],
          date: { seconds: 1234567890 },
          image: 'test.jpg',
          flyer: 'test.pdf',
          active: true,
          teams: [],
          game: undefined,
          homeResult: { id: '1', name: 'Urtenen', numbers: 0, points: 0 },
          year: 2026,
          images: [],
          name: 'Test',
          preName: 'Test',
          roles: []
        }
      },
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: { paramMap: { get: () => '1' } },
          params: of({ id: '1' })
        }
      }
    ]
  });
});

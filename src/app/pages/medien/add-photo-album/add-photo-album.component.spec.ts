import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhotoAlbumComponent } from './add-photo-album.component';

describe('AddPhotoAlbumComponent', () => {
  let component: AddPhotoAlbumComponent;
  let fixture: ComponentFixture<AddPhotoAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPhotoAlbumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPhotoAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

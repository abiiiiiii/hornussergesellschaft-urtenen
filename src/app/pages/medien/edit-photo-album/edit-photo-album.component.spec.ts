import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhotoAlbumComponent } from './edit-photo-album.component';

describe('AddPhotoAlbumComponent', () => {
  let component: EditPhotoAlbumComponent;
  let fixture: ComponentFixture<EditPhotoAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [EditPhotoAlbumComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(EditPhotoAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

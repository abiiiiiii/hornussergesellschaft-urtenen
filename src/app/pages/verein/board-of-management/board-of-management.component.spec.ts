import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardOfManagementComponent } from './board-of-management.component';

describe('BoardOfManagementComponent', () => {
  let component: BoardOfManagementComponent;
  let fixture: ComponentFixture<BoardOfManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardOfManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardOfManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

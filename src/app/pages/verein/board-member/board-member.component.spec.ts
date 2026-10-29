import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardMemberComponent } from './board-member.component';

describe('BoardMemberComponent', () => {
  let component: BoardMemberComponent;
  let fixture: ComponentFixture<BoardMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [BoardMemberComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardMemberComponent);
    component = fixture.componentInstance;
    component.member = { name: 'Aebi', preName: 'Joel', image: 'test.jpg', roles: [] } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

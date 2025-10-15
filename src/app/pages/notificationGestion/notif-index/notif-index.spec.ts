import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifIndex } from './notif-index';

describe('NotifIndex', () => {
  let component: NotifIndex;
  let fixture: ComponentFixture<NotifIndex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotifIndex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotifIndex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

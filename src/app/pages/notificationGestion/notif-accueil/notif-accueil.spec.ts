import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifAccueil } from './notif-accueil';

describe('NotifAccueil', () => {
  let component: NotifAccueil;
  let fixture: ComponentFixture<NotifAccueil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotifAccueil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotifAccueil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

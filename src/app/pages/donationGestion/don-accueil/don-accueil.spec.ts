import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonAccueil } from './don-accueil';

describe('DonAccueil', () => {
  let component: DonAccueil;
  let fixture: ComponentFixture<DonAccueil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonAccueil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonAccueil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

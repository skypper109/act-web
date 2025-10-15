import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssoAccueil } from './asso-accueil';

describe('AssoAccueil', () => {
  let component: AssoAccueil;
  let fixture: ComponentFixture<AssoAccueil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssoAccueil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssoAccueil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

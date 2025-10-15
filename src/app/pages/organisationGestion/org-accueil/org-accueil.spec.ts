import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAccueil } from './org-accueil';

describe('OrgAccueil', () => {
  let component: OrgAccueil;
  let fixture: ComponentFixture<OrgAccueil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgAccueil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgAccueil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

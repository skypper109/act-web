import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgIndex } from './org-index';

describe('OrgIndex', () => {
  let component: OrgIndex;
  let fixture: ComponentFixture<OrgIndex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgIndex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgIndex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

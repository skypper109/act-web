import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgCreate } from './org-create';

describe('OrgCreate', () => {
  let component: OrgCreate;
  let fixture: ComponentFixture<OrgCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

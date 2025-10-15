import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonDetail } from './don-detail';

describe('DonDetail', () => {
  let component: DonDetail;
  let fixture: ComponentFixture<DonDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

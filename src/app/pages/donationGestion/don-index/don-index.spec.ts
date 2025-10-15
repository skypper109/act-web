import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonIndex } from './don-index';

describe('DonIndex', () => {
  let component: DonIndex;
  let fixture: ComponentFixture<DonIndex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonIndex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonIndex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

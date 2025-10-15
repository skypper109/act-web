import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssoIndex } from './asso-index';

describe('AssoIndex', () => {
  let component: AssoIndex;
  let fixture: ComponentFixture<AssoIndex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssoIndex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssoIndex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

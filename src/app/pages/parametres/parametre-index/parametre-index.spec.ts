import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreIndex } from './parametre-index';

describe('ParametreIndex', () => {
  let component: ParametreIndex;
  let fixture: ComponentFixture<ParametreIndex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametreIndex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametreIndex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

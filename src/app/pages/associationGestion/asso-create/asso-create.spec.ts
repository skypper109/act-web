import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssoCreate } from './asso-create';

describe('AssoCreate', () => {
  let component: AssoCreate;
  let fixture: ComponentFixture<AssoCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssoCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssoCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

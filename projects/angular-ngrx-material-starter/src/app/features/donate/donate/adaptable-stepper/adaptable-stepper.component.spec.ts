import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaptableStepperComponent } from './adaptable-stepper.component';

describe('AdaptableStepperComponent', () => {
  let component: AdaptableStepperComponent;
  let fixture: ComponentFixture<AdaptableStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdaptableStepperComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdaptableStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

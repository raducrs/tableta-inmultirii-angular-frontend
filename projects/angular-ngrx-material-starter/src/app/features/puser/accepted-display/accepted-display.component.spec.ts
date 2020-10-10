import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedDisplayComponent } from './accepted-display.component';

describe('DisplayComponent', () => {
  let component: AcceptedDisplayComponent;
  let fixture: ComponentFixture<AcceptedDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptedDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

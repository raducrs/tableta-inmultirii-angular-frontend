import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GadgetTabComponent } from './gadget-tab.component';

describe('UserTabComponent', () => {
  let component: GadgetTabComponent;
  let fixture: ComponentFixture<GadgetTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GadgetTabComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GadgetTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

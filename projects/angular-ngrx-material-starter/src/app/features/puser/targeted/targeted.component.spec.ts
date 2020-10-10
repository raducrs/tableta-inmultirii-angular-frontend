import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetedComponent } from './targeted.component';

describe('TargetedComponent', () => {
  let component: TargetedComponent;
  let fixture: ComponentFixture<TargetedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

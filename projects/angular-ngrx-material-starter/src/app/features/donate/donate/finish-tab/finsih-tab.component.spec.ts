import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishTabComponent } from './finish-tab.component';

describe('UserTabComponent', () => {
  let component: FinishTabComponent;
  let fixture: ComponentFixture<FinishTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FinishTabComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PConfirmComponent } from './p-confirm.component';

describe('ThankYouComponent', () => {
  let component: PConfirmComponent;
  let fixture: ComponentFixture<PConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

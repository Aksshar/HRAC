import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBookingComponent } from './new-booking.component';

describe('NewBookingComponent', () => {
  let component: NewBookingComponent;
  let fixture: ComponentFixture<NewBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

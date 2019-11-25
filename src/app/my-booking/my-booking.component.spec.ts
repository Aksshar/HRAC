import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBookingComponent } from './my-booking.component';

describe('MyBookingComponent', () => {
  let component: MyBookingComponent;
  let fixture: ComponentFixture<MyBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

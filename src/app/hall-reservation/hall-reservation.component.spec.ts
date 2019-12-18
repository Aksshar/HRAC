import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HallReservationComponent } from './hall-reservation.component';

describe('HallReservationComponent', () => {
  let component: HallReservationComponent;
  let fixture: ComponentFixture<HallReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HallReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HallReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

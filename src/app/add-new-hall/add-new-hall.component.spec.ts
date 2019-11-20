import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewHallComponent } from './add-new-hall.component';

describe('AddNewHallComponent', () => {
  let component: AddNewHallComponent;
  let fixture: ComponentFixture<AddNewHallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewHallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHallsComponent } from './manage-halls.component';

describe('ManageHallsComponent', () => {
  let component: ManageHallsComponent;
  let fixture: ComponentFixture<ManageHallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageHallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

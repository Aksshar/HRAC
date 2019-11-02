import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentsemesterComponent } from './currentsemester.component';

describe('CurrentsemesterComponent', () => {
  let component: CurrentsemesterComponent;
  let fixture: ComponentFixture<CurrentsemesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentsemesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentsemesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

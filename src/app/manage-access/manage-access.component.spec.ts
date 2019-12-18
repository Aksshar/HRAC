import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccessComponent } from './manage-access.component';

describe('ManageAccessComponent', () => {
  let component: ManageAccessComponent;
  let fixture: ComponentFixture<ManageAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

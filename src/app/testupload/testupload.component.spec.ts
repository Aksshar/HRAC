import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestuploadComponent } from './testupload.component';

describe('TestuploadComponent', () => {
  let component: TestuploadComponent;
  let fixture: ComponentFixture<TestuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

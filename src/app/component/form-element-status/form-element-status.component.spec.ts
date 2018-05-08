import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormElementStatusComponent } from './form-element-status.component';

describe('FormElementStatusComponent', () => {
  let component: FormElementStatusComponent;
  let fixture: ComponentFixture<FormElementStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormElementStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormElementStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

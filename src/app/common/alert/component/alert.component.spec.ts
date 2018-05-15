import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertResponseComponent } from './alert-response.component';

describe('AlertResponseComponent', () => {
  let component: AlertResponseComponent;
  let fixture: ComponentFixture<AlertResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

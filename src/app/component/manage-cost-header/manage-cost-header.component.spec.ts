import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCostHeaderComponent } from './manage-cost-header.component';

describe('ManageCostHeaderComponent', () => {
  let component: ManageCostHeaderComponent;
  let fixture: ComponentFixture<ManageCostHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCostHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCostHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

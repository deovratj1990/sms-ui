import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostHeaderComponent } from './cost-header.component';

describe('CostHeaderComponent', () => {
  let component: CostHeaderComponent;
  let fixture: ComponentFixture<CostHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTransactionDefinitionComponent } from './manage-transaction-definition.component';

describe('ManageTransactionDefinitionComponent', () => {
  let component: ManageTransactionDefinitionComponent;
  let fixture: ComponentFixture<ManageTransactionDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTransactionDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTransactionDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

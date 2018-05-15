import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDefinitionComponent } from './transaction-definition.component';

describe('TransactionDefinitionComponent', () => {
  let component: TransactionDefinitionComponent;
  let fixture: ComponentFixture<TransactionDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

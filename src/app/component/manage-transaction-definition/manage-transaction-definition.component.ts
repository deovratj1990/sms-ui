import { Component, OnInit } from '@angular/core';
import { CostHeader } from '../../classes/render/CostHeader';
import { CostHeaderService } from '../../service/costHeader.service';
import { TransactionDefinition } from '../../classes/render/TransactionDefinition';
import { TransactionDefinitionService } from '../../service/transactionDefinition.service';
import { TransactionType } from '../../classes/render/TransactionType';

@Component({
  selector: 'app-manage-transaction-definition',
  templateUrl: './manage-transaction-definition.component.html',
  styleUrls: ['./manage-transaction-definition.component.css']
})
export class ManageTransactionDefinitionComponent implements OnInit {

  private costHeader: Array<CostHeader> = new Array<CostHeader>();

  private transactionDefinition: TransactionDefinition = new TransactionDefinition();

  private transactionTypes: Array<TransactionType> = new Array<TransactionType>();

  constructor(
    private costHeaderService: CostHeaderService,
    private transactionDefinitionService: TransactionDefinitionService
  ) { }

  ngOnInit() { 
    this.getCostHeaders();

    this.getTransactionType();
  }

  getCostHeaders(): void {
    this.costHeaderService.getAll()
    .subscribe(response => {
      this.costHeader = response.data;
    });
  }

  getTransactionType(): void {
    this.transactionDefinitionService.getTransactionType()
    .subscribe(response => {
      this.transactionTypes = response;
    });
  }

}

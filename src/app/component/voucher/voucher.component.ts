import { Component, OnInit } from '@angular/core';
import { Alert } from '../../model/common/Alert';
import { ValidationType } from '../../model/enum/ValidationType';
import { Voucher } from '../../model/voucher/Voucher';
import { ActivatedRoute } from '@angular/router';
import { TransactionDefinitionService } from '../../service/accounting/transaction-definition/TransactionDefinition.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {

  private routeParameter: any;
  private transactionDefinitionId: number;

  private formAlert: Alert = new Alert();
  private listAlert: Alert = new Alert();
  private ValidationType = ValidationType;

  private voucherForm: Voucher = new Voucher();

  constructor(
    private route: ActivatedRoute,
    private transactionDefinitionService: TransactionDefinitionService,

  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
         let id= +params['id'];
         //getTrnasactionDefinition(id);
      });



  }

  getTrnasactionDefinition() {
    this.transactionDefinitionService.getById(this.transactionDefinitionId)
    .subscribe(response => {
      console.log(response);
    })
  }



}

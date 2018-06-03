import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from '../../../model/common/Alert';
import { ValidationType } from '../../../model/enum/ValidationType';
import { AlertType } from '../../../model/enum/AlertType';
import { HttpStatus } from '../../../model/common/HttpStatus';
import { Transaction } from '../../../model/transaction/transaction/Transaction';
import { TransactionService } from '../../../service/accounting/transaction/Transaction.service';
import { TransactionAlert } from '../../../model/transaction/transaction/TransactionAlert';
import { AppError } from '../../../model/error/app-error';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  private routeParameter: any;
  private transactionDefinitionId: number;

  private formAlert: Alert = new Alert();
  private listAlert: Alert = new Alert();
  private ValidationType = ValidationType;

  private transactionForm: Transaction = new Transaction();
  private transactionAlert: TransactionAlert = new TransactionAlert();

  private entityList: Array<{ id: number, name: string }> = new Array<{ id: number, name: string }>();

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        let id = +params['id'];
        this.getTransactionDetails(id);
      });

    this.transactionAlert = {
      entityId: {
        activityType: { show: 0, type: null, text: null },
        validation: [
          { validationType: ValidationType.REQUIRED, text: 'Entity is Mandatory.' },
        ]
      },
      date: {
        activityType: { show: 0, type: null, text: null },
        validation: [
          { validationType: ValidationType.REQUIRED, text: 'Date is Mandatory.' },
        ]
      },
      paymentAmount: {
        activityType: { show: 0, type: null, text: null },
        validation: [
          { validationType: ValidationType.REQUIRED, text: 'Payment Amount is Mandatory.' },
        ]
      },
      paymentType: {
        activityType: { show: 0, type: null, text: null },
        validation: [
          { validationType: ValidationType.REQUIRED, text: 'Payment Type is Mandatory.' },
        ]
      },
    };

  }

  getTransactionDetails(id) {
    this.transactionService.getByTransactionDefinitionId(id)
      .subscribe(response => {
        if (response.code === HttpStatus.OK) {
          this.transactionForm = response.data.transactionDetails;
          this.entityList = response.data.entityList;
          return false;
        }

        this.router.navigate(['/transaction-definition']);
        return false;

      })
  }

  save(formTransaction) {
    this.listAlert = new Alert();

    this.formAlert.type = AlertType.INFO;
    this.formAlert.text = 'Saving Data. Please Wait.';

    this.transactionService.save(this.transactionForm)
      .subscribe(
        response => {

          if (response.code === HttpStatus.NOT_FOUND) {
            this.router.navigate(['/transaction-definition']);
            return false;
          }

          if (response.code === HttpStatus.BAD_REQUEST) {
            this.formAlert.type = AlertType.DANGER;
            this.formAlert.text = response.message;
            return false;
          }

          if (response.code === HttpStatus.CREATED) {
            this.transactionForm = response.data.transactionDetails

            this.formAlert.type = AlertType.SUCCESS;
            this.formAlert.text = response.message;
            return false;
          }

          this.formAlert.type = AlertType.DANGER;
          this.formAlert.text = 'Something went wrong.';
        },
        (error: AppError) => {
          this.formAlert.type = AlertType.DANGER;
          this.formAlert.text = 'Something went wrong.';
        });
  }


}

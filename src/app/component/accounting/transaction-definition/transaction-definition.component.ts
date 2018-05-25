import { Component, OnInit } from '@angular/core';
import { Alert } from '../../../model/common/Alert';
import { ValidationType } from '../../../model/enum/ValidationType';
import { TransactionDefinitionAlert } from '../../../model/transaction/definition/TransactionDefinitionAlert';
import { TransactionDefinition } from '../../../model/transaction/definition/TransitionDefinition';
import { CostHeader } from '../../../model/cost-header/CostHeader';
import { TransactionParticular } from '../../../model/transaction/particular/TransactionParticular';
import { CostHeaderService } from '../../../service/accounting/cost-header/CostHeader.service';
import { TransactionDefinitionService } from '../../../service/accounting/transaction-definition/TransactionDefinition.service';
import { StaticFormContentService } from '../../../service/staticFormContent/StaticFormContent.service';
import { AlertType } from '../../../model/enum/AlertType';
import { HttpStatus } from '../../../model/common/HttpStatus';
import { AppError } from '../../../model/error/app-error';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-transaction-definition',
  templateUrl: './transaction-definition.component.html',
  styleUrls: ['./transaction-definition.component.css']
})
export class TransactionDefinitionComponent implements OnInit {

  private transactionDefinitionsId = 0;

  private formAlert: Alert = new Alert();
  private listAlert: Alert = new Alert();
  private ValidationType = ValidationType;
  private transactionDefinitionAlerts: TransactionDefinitionAlert = new TransactionDefinitionAlert();
  private transactionDefinitionForm: TransactionDefinition = new TransactionDefinition();
  private transactionDefinitionDetail: TransactionDefinition = new TransactionDefinition();

  private transactionDefinitions: Array<TransactionDefinition> = new Array<TransactionDefinition>();

  private costHeaders: Array<CostHeader> = new Array<CostHeader>();
  private particulars: Array<TransactionParticular> = new Array<TransactionParticular>();

  private currentDate = new Date().toLocaleDateString().split('/');
  private formatDate: string = this.currentDate[2] + '-' + String("00" + this.currentDate[0]).slice(-2) + '-' + String("00" + this.currentDate[1]).slice(-2);

  constructor(
    private costHeaderService: CostHeaderService,
    private transactionDefinitionService: TransactionDefinitionService,
    private _staticFormContentService: StaticFormContentService
  ) { }

  ngOnInit() {
    this.transactionDefinitionAlerts = {
      costHeader: {
        activityType: { show: 1, type: AlertType.INFO, text: 'Fetching Data. Please wait.' },
        validation: [
          { validationType: ValidationType.REQUIRED, text: 'Cost Header is Mandatory.' }
        ]
      },
      transactionFrom: {
        activityType: { show: 1, type: AlertType.INFO, text: 'Fetching Data. Please wait.' },
        validation: [
          { validationType: ValidationType.REQUIRED, text: 'Transaction From is Mandatory.' }
        ]
      },
      transactionTo: {
        activityType: { show: 1, type: AlertType.INFO, text: 'Fetching Data. Please wait.' },
        validation: [
          { validationType: ValidationType.REQUIRED, text: 'Transaction To is Mandatory.' },
          { validationType: ValidationType.NOT_SAME, text: 'Transaction From & To must not be Same.' }
        ]
      },
      interval: {
        activityType: { show: 1, type: AlertType.INFO, text: 'Fetching Data. Please wait.' },
        validation: [
          { validationType: ValidationType.REQUIRED, text: 'Interval is Mandatory.' }
        ]
      },
      amount: {
        activityType: { show: 0, type: null, text: null },
        validation: [
          { validationType: ValidationType.REQUIRED, text: 'Amount is Mandatory.' }
        ]
      },
      fromDate: {
        activityType: { show: 0, type: null, text: null },
        validation: []
      }
    };

    this.getTransactionDefinitions();
  }

  getTransactionDefinitions(): void {
    this.listAlert.type = AlertType.INFO
    this.listAlert.text = 'Fetching Data. Please wait.';

    this.transactionDefinitionService.getAll()
      .subscribe(
      response => {
        if (response.code === HttpStatus.OK || response.code === HttpStatus.NO_CONTENT) {
          if (response.code === HttpStatus.OK) {
            this.transactionDefinitions = response.data.transactionDefinitions;
          }
          this.listAlert.text = '';
          return false;
        }

        this.listAlert.type = AlertType.DANGER;
        this.listAlert.text = 'Something went wrong.';
      },
      (error: AppError) => {
        this.listAlert.type = AlertType.DANGER;
        this.listAlert.text = 'Something went wrong.';
      });
  }

  getCostHeaders(): void {
    this.transactionDefinitionForm.particulars = [];
    this.costHeaderService.getAll()
      .subscribe(
      response => {
        if (response.code === HttpStatus.OK || response.code === HttpStatus.NO_CONTENT) {
          if (response.code === HttpStatus.OK) {
            this.costHeaders = response.data.costHeaders;

            response.data.costHeaders.forEach((item, index) => {
              let particular: TransactionParticular = new TransactionParticular();

              particular.id = null;
              particular.costHeader = item;
              particular.amount = null;

              this.transactionDefinitionForm.particulars.push(particular);
            });
            this.uiActivity('costHeader', 0);
            return false;
          }
        }
        this.uiActivity('costHeader', 1, AlertType.DANGER, 'Something went wrong.');
      },
      (error: AppError) => {
        this.uiActivity('costHeader', 1, AlertType.DANGER, 'Something went wrong.');
      });
  }

  getStaticContent() {
    this._staticFormContentService.StaticFormContent()
      .subscribe(response => {
        if (response.code === HttpStatus.OK || response.code === HttpStatus.NO_CONTENT) {
          if (response.code === HttpStatus.OK) {
            this._staticFormContentService.staticFormContent = response.data;

            if (this._staticFormContentService.staticFormContent.intervals.length == 0) {
              this.uiActivity('interval', 0);
            } else {
              this.uiActivity('interval', 0);
            }

            if (this._staticFormContentService.staticFormContent.accountTypes.length == 0) {
              this.uiActivity('transactionFrom', 1);
              this.uiActivity('transactionTo', 1);
            } else {
              this.uiActivity('transactionFrom', 0);
              this.uiActivity('transactionTo', 0);
            }
            return false;
          }

          this.uiActivity('interval', 1, AlertType.DANGER, response.message);
          this.uiActivity('transactionFrom', 1, AlertType.DANGER, response.message);
          this.uiActivity('transactionTo', 1, AlertType.DANGER, response.message);
          return false;
        }

        this.uiActivity('interval', 1, AlertType.DANGER, 'Something went wrong.');
        this.uiActivity('transactionFrom', 1, AlertType.DANGER, 'Something went wrong.');
        this.uiActivity('transactionTo', 1, AlertType.DANGER, 'Something went wrong.');
      },
      (error: AppError) => {
        this.uiActivity('interval', 1, AlertType.DANGER, 'Something went wrong.');
        this.uiActivity('transactionFrom', 1, AlertType.DANGER, 'Something went wrong.');
        this.uiActivity('transactionTo', 1, AlertType.DANGER, 'Something went wrong.');
      });
  }

  changeHasParticular(element) {
    this.transactionDefinitionForm.amount = null;
  }

  calculateAmount() {
    if (this.transactionDefinitionForm.costHeader.id) {
      let index = this.transactionDefinitionForm.particulars.findIndex(x => x.costHeader.id == this.transactionDefinitionForm.costHeader.id);
      this.transactionDefinitionForm.particulars[index].amount = null;
    }

    this.transactionDefinitionForm.particulars.forEach((item, index) => {
      if (index === 0) {
        this.transactionDefinitionForm.amount = 0;
      }
      this.transactionDefinitionForm.amount += item.amount;
    });

    if (this.transactionDefinitionForm.amount === 0) {
      this.transactionDefinitionForm.amount = null;
    }
  }

  resetForm(formTransactionDefinition) {
    this.getStaticContent();
    this.getCostHeaders();

    this.transactionDefinitionsId = 0;
    this.formAlert = new Alert();
    formTransactionDefinition.reset();
  }

  showDetails(id) {
    let index = this.transactionDefinitions.findIndex(x => x.id == id);
    this.transactionDefinitionDetail = this.transactionDefinitions[index];
  }

  edit(id) {
    this.getStaticContent();
    this.getCostHeaders();

    this.listAlert = new Alert();

    this.transactionDefinitionsId = id;
    this.formAlert.type = AlertType.INFO;
    this.formAlert.text = 'Fetching Data. Please Wait.';

    this.transactionDefinitionService.getById(this.transactionDefinitionsId)
      .subscribe(
      response => {
        if (response.code === HttpStatus.OK || response.code === HttpStatus.NO_CONTENT) {
          if (response.code === HttpStatus.OK) {

            Object.keys(response.data.transactionDefinition).forEach(element => {
              if (element != 'particulars') {
                this.transactionDefinitionForm[element] = response.data.transactionDefinition[element];
              } else {
                response.data.transactionDefinition[element].forEach(ele => {

                  let index = this.transactionDefinitionForm.particulars.findIndex(x => x.costHeader.id == ele.costHeader.id);
                  if (index >= 0 && this.transactionDefinitionForm.costHeader.id != ele.costHeader.id) {
                    this.transactionDefinitionForm.particulars[index].id = ele.id;
                    this.transactionDefinitionForm.particulars[index].amount = ele.amount;
                  }

                });
              }
            });

            this.formAlert.type = AlertType.SUCCESS;
            this.formAlert.text = response.message;
            return false;
          } else {
            this.formAlert.type = AlertType.DANGER;
            this.formAlert.text = response.message;
            return false;
          }
        }

        this.formAlert.type = AlertType.DANGER;
        this.formAlert.text = 'Something went wrong.';
      },
      (error: AppError) => {
        this.formAlert.type = AlertType.DANGER;
        this.formAlert.text = 'Something went wrong.';
      });
  }

  save(formTransactionDefinition) {
    this.listAlert = new Alert();

    this.formAlert.type = AlertType.INFO;
    this.formAlert.text = 'Saving Data. Please Wait.';

    this.transactionDefinitionService.save(this.transactionDefinitionsId, this.transactionDefinitionForm)
      .subscribe(
      response => {
        if (response.code === HttpStatus.BAD_REQUEST) {
          this.formAlert.type = AlertType.DANGER;
          this.formAlert.text = response.message;
          return false;
        }

        if (response.code === HttpStatus.CONFLICT) {
          this.formAlert.type = AlertType.DANGER;
          this.formAlert.text = response.message;
          return false;
        }

        if (response.code === HttpStatus.CREATED) {
          if (this.transactionDefinitions.findIndex(x => x.id == response.data.id) == -1) {
            this.transactionDefinitions.splice(0, 0, response.data['transactionDefinition']);
          } else {
            let index = this.transactionDefinitions.findIndex(x => x.id == response.data.id);
            this.transactionDefinitions.splice(index, 1, response.data['transactionDefinition']);
          }

          this.transactionDefinitionsId = 0;
          formTransactionDefinition.reset();

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

  delete(id) {
    this.formAlert = { type: null, text: null };

    this.transactionDefinitionsId = id;
    this.listAlert.type = AlertType.INFO;
    this.listAlert.text = 'Deleting Data. Please Wait.';

    this.transactionDefinitionService.delete(this.transactionDefinitionsId)
      .subscribe(
      response => {
        if (response.code === HttpStatus.NO_CONTENT) {
          let index = this.transactionDefinitions.findIndex(x => x.id == this.transactionDefinitionsId);
          this.transactionDefinitions.splice(index, 1);
          this.transactionDefinitionsId = 0;

          this.listAlert.type = AlertType.SUCCESS;
          this.listAlert.text = response.message;
          return false;
        }

        this.listAlert.type = AlertType.DANGER;
        this.listAlert.text = "Something went wrong.";
      },
      (error: AppError) => {
        this.listAlert.type = AlertType.DANGER;
        this.listAlert.text = 'Something went wrong.';
      });
  }

  uiActivity(element, show?, type?, text?) {
    this.transactionDefinitionAlerts[element].activityType.show = show;
    if (type) {
      this.transactionDefinitionAlerts[element].activityType.type = type;
    }
    if (text) {
      this.transactionDefinitionAlerts[element].activityType.text = text;
    }
  }
}

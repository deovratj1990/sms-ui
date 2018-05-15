import {Component, OnInit} from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import {Alert} from '../../../../class/common/Alert';
import {ValidationType} from '../../../../class/enum/ValidationType';
import {TransactionDefinition} from '../model/TransactionDefinition';
import {TransactionDefinitionAlert} from '../model/TransactionDefinitionAlert';
import {CostHeader} from '../../../cost-header/model/CostHeader';
import {TransactionParticular} from '../../particular/model/TransactionParticular';
import {CostHeaderService} from '../../../cost-header/service/CostHeaderService';
import {TransactionDefinitionService} from '../service/TransactionDefinitionService';
import {AlertType} from '../../../../class/enum/AlertType';
import {HttpStatus} from '../../../../class/common/HttpStatus';
import {AppError} from '../../../../class/error/app-error';
import {StaticFormContentService} from "../../../../common/staticFormContent/service/StaticFormContentService";
import {StaticFormContent} from "../../../../common/staticFormContent/model/StaticFormContent";

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

  private transactionDefinition: TransactionDefinition = new TransactionDefinition();
  private transactionDefinitionAlerts: TransactionDefinitionAlert = new TransactionDefinitionAlert();
  private transactionDefinitions: Array<TransactionDefinition> = new Array<TransactionDefinition>();

  private costHeaders: Array<CostHeader> = new Array<CostHeader>();
  private particulars: Array<TransactionParticular> = new Array<TransactionParticular>();

  currentDate = new Date().toLocaleDateString().split('/');
  formatDate: any = {
    year: this.currentDate[2],
    month: this.currentDate[0],
    day: this.currentDate[1]
  }

  myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
    disableWeekends: true,
    showTodayBtn: false,
    disableUntil: this.formatDate,
    openSelectorTopOfInput: true,
    showSelectorArrow: false
  };

  constructor(
    private costHeaderService: CostHeaderService,
    private transactionDefinitionService: TransactionDefinitionService,
    private _staticFormContentService: StaticFormContentService
  ) {
  }

  ngOnInit() {

    this.transactionDefinitionAlerts = {
      costHeader: {
        activityType: {show: 1, type: AlertType.INFO, text: 'Fetching Data. Please wait.'},
        validation: [
          {validationType: ValidationType.REQUIRED, text: 'Cost Header is Mandatory.'}
        ]
      },
      holderType: {
        activityType: {show: 1, type: AlertType.INFO, text: 'Fetching Data. Please wait.'},
        validation: [
          {validationType: ValidationType.REQUIRED, text: 'Applicable To is Mandatory.'}
        ]
      },
      interval: {
        activityType: {show: 1, type: AlertType.INFO, text: 'Fetching Data. Please wait.'},
        validation: [
          {validationType: ValidationType.REQUIRED, text: 'Interval is Mandatory.'}
        ]
      },
      amount: {
        activityType: {show: 0, type: null, text: null},
        validation: [
          {validationType: ValidationType.REQUIRED, text: 'Amount is Mandatory.'}
        ]
      },
      from: {
        activityType: {show: 0, type: null, text: null},
        validation: [
          {validationType: ValidationType.REQUIRED, text: 'Date is Mandatory.'}
        ]
      }
    };

    this.getStaticContent();
    this.getCostHeaders();

    //this.getTransactionDefinitions();
  }

  getStaticContent() {
    this._staticFormContentService.StaticFormContent()
      .subscribe(response => {
          this._staticFormContentService.staticFormContent = response;
          if (this._staticFormContentService.staticFormContent.applicableTo.length == 0) {
            this.transactionDefinitionAlerts.holderType.activityType.show = 1;
          } else {
            this.transactionDefinitionAlerts.holderType.activityType.show = 0;
          }

          if (this._staticFormContentService.staticFormContent.intervals.length == 0) {
            this.transactionDefinitionAlerts.interval.activityType.show = 1;
          } else {
            this.transactionDefinitionAlerts.interval.activityType.show = 0;
          }

        },
        (error: AppError) => {
          this.transactionDefinitionAlerts.holderType.activityType.show = 1;
          this.transactionDefinitionAlerts.holderType.activityType.type = AlertType.DANGER;
          this.transactionDefinitionAlerts.holderType.activityType.text = 'Something went wrong.';
          ;

          this.transactionDefinitionAlerts.interval.activityType.show = 1;
          this.transactionDefinitionAlerts.interval.activityType.type = AlertType.DANGER;
          this.transactionDefinitionAlerts.interval.activityType.text = 'Something went wrong.';
          ;
        });
  }

  getCostHeaders(): void {

    this.costHeaderService.getAll()
      .subscribe(
        response => {
          if (response.code === HttpStatus.OK || response.code === HttpStatus.NO_CONTENT) {
            if (response.code === HttpStatus.OK) {
              this.costHeaders = response.data.costHeaders;

              response.data.costHeaders.forEach((item, index) => {
                let particular: TransactionParticular = new TransactionParticular();

                particular.id = item.id;
                particular.name = item.name;
                particular.amount = null;

                this.transactionDefinition.particulars.push(particular);
              });
            }

            this.transactionDefinitionAlerts.costHeader.activityType.show = 0;
            return false
          }

          this.transactionDefinitionAlerts.costHeader.activityType.show = 1;
          this.transactionDefinitionAlerts.costHeader.activityType.type = AlertType.DANGER;
          this.transactionDefinitionAlerts.costHeader.activityType.text = 'Something went wrong.';
          ;
        },
        (error: AppError) => {
          this.transactionDefinitionAlerts.costHeader.activityType.show = 1;
          this.transactionDefinitionAlerts.costHeader.activityType.type = AlertType.DANGER;
          this.transactionDefinitionAlerts.costHeader.activityType.text = 'Something went wrong.';
          ;
        });
  }

  getTransactionDefinitions(): void {
    this.listAlert.type = AlertType.INFO
    this.listAlert.text = 'Fetching Data. Please wait.';

    this.transactionDefinitionService.getAll()
      .subscribe(
        response => {
          if (response.code === HttpStatus.OK || response.code === HttpStatus.NO_CONTENT) {
            if (response.code === HttpStatus.OK)
              this.transactionDefinition = response.data.transactionDefinitions;

            this.listAlert.type = AlertType.SUCCESS;
            this.listAlert.text = response.message;
            return false;
          }

          this.listAlert.type = AlertType.DANGER
          this.listAlert.text = 'Something went wrong.';
        },
        (error: AppError) => {
          this.listAlert.type = AlertType.DANGER
          this.listAlert.text = 'Something went wrong.';
        });
  }

  changeHasParticular(element) {
    this.transactionDefinition.amount = null;
  }

  calculateAmount() {
    if (this.transactionDefinition.chId) {
      let index = this.transactionDefinition.particulars.findIndex(x => x.id == this.transactionDefinition.chId);
      this.transactionDefinition.particulars[index].amount = null;
    }

    this.transactionDefinition.particulars.forEach((item, index) => {
      if (index == 0)
        this.transactionDefinition.amount = 0;

      this.transactionDefinition.amount += item.amount;
    });

    if (this.transactionDefinition.amount == 0) {
      this.transactionDefinition.amount = null;
    }
  }

  resetForm(formTransactionDefinition) {
    this.transactionDefinitionsId = 0;
    this.formAlert = new Alert();
    formTransactionDefinition.reset();
  }

  showDetails(id) {
    let index = this.transactionDefinitions.findIndex(x => x.id == id);
    this.transactionDefinition = this.transactionDefinitions[index];

  }

  save(formTransactionDefinition) {
    this.listAlert = new Alert();

    this.formAlert.type = AlertType.INFO;
    this.formAlert.text = 'Saving Data. Please Wait.';

    this.transactionDefinitionService.save(this.transactionDefinition)
      .subscribe(
        response => {
          if (response.code === HttpStatus.CREATED) {
            if (this.transactionDefinitions.findIndex(x => x.id == response.data.id) == -1) {
              this.transactionDefinitions.splice(0, 0, response.data);
            } else {
              let index = this.transactionDefinitions.findIndex(x => x.id == response.data.id);
              this.transactionDefinitions.splice(index, 1, response.data);
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
}

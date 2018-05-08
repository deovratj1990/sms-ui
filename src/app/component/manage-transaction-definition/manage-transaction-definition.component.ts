import { Component, OnInit } from '@angular/core';
import { CostHeader } from '../../classes/render/CostHeader';
import { CostHeaderService } from '../../service/costHeader.service';
import { TransactionDefinition } from '../../classes/render/TransactionDefinition';
import { TransactionDefinitionService } from '../../service/transactionDefinition.service';
import { TransactionType } from '../../classes/render/TransactionType';
import { AccountHolderType } from '../../classes/render/AccountHolderType';
import { TransactionInterval } from '../../classes/render/TransactionInterval';
import { IMyDpOptions } from 'mydatepicker';
import { AppError } from '../../classes/error/app-error';
import { Particular } from '../../classes/io/Particular';
import { HttpStatus } from '../../classes/common/HttpStatus';
import { Alert } from '../../classes/render/Alert';
import { AlertType } from '../../classes/enum/AlertType';
//import { resetFakeAsyncZone } from '@angular/core/testing';

@Component({
  selector: 'app-manage-transaction-definition',
  templateUrl: './manage-transaction-definition.component.html',
  styleUrls: ['./manage-transaction-definition.component.css']
})
export class ManageTransactionDefinitionComponent implements OnInit {

  private transactionDefinitionsId = 0;

  private formSuccess: Alert = new Alert();
  private costHeaderSuccess: Alert = new Alert();
  private typeSuccess: Alert = new Alert();
  private holderTypeSuccess: Alert = new Alert();
  private intervalSuccess: Alert = new Alert();
  private listSuccess: Alert = new Alert();

  private costHeaders: Array<CostHeader> = new Array<CostHeader>();
  private transactionDefinition: TransactionDefinition = new TransactionDefinition();
  private transactionDefinitions: Array<TransactionDefinition> = new Array<TransactionDefinition>();
  private transactionTypes: Array<TransactionType> = new Array<TransactionType>();
  private accountHolderType: Array<AccountHolderType> = new Array<AccountHolderType>();
  private intervals: Array<TransactionInterval> = new Array<TransactionInterval>();

  private tranDefForm: TransactionDefinition = new TransactionDefinition();
  private particulars: Array<Particular> = new Array<Particular>();

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
  ) { }

  ngOnInit() {
    this.getCostHeaders();
    this.getTransactionType();
    this.getHolderType();
    this.getInterval();
    this.getTransactionDefinitions();
  }

  getCostHeaders(): void {
    this.costHeaderSuccess.type = AlertType.INFO;
    this.costHeaderSuccess.text = 'Fetching Data. Please wait.';

    this.costHeaderService.getAll()
      .subscribe(
        response => {
          if (response.code === HttpStatus.OK || response.code === HttpStatus.NO_CONTENT) {
            if (response.code === HttpStatus.OK) {
              this.costHeaders = response.data;

              response.data.forEach((item, index) => {
                let particular: Particular = new Particular();

                particular.id = item.id;
                particular.name = item.name;
                particular.amount = null;

                this.tranDefForm.particulars.push(particular);
              });
            }

            this.costHeaderSuccess.type = AlertType.SUCCESS;
            this.costHeaderSuccess.text = response.message;
            return false
          }

          this.costHeaderSuccess.type = AlertType.DANGER;
          this.costHeaderSuccess.text = 'Something went wrong.';
        },
        (error: AppError) => {
          this.costHeaderSuccess.type = AlertType.DANGER;
          this.costHeaderSuccess.text = 'Something went wrong.';
        });
  }

  getTransactionType(): void {
    this.typeSuccess.type = AlertType.INFO;
    this.typeSuccess.text = 'Fetching Data. Please wait.';

    this.transactionDefinitionService.getTransactionType()
      .subscribe(
        response => {
          if (response.code === HttpStatus.OK || response.code === HttpStatus.NO_CONTENT) {
            if (response.code === HttpStatus.OK)
              this.transactionTypes = response.data;

            this.typeSuccess.type = AlertType.SUCCESS;
            this.typeSuccess.text = response.message;
          }

          this.costHeaderSuccess.type = AlertType.DANGER;
          this.costHeaderSuccess.text = 'Something went wrong.';
        },
        (error: AppError) => {
          this.costHeaderSuccess.type = AlertType.DANGER;
          this.costHeaderSuccess.text = 'Something went wrong.';
        });
  }

  getHolderType(): void {
/*    this.holderTypeSuccess.type = AlertType.INFO;
    this.holderTypeSuccess.message = 'Fetching Data. Please wait.';

    this.accountsService.getAccountsType()
      .subscribe(
        response => {
          if (response.code === HttpStatus.OK || response.code === HttpStatus.NO_CONTENT) {
            if (response.code === HttpStatus.OK)
              this.accountHolderType = response.data;

            this.holderTypeSuccess.type = AlertType.SUCCESS;
            this.holderTypeSuccess.message = response.message;
          }
          this.costHeaderSuccess.type = AlertType.DANGER;
          this.costHeaderSuccess.message = 'Something went wrong.';
        },
        (error: AppError) => {
          this.costHeaderSuccess.type = AlertType.DANGER;
          this.costHeaderSuccess.message = 'Something went wrong.';
        });
        */
  }

  getInterval(): void {
    this.intervalSuccess.type = AlertType.INFO;
    this.intervalSuccess.text = 'Fetching Data. Please wait.';

    this.transactionDefinitionService.getInterval()
      .subscribe(
        response => {
          if (response.code === HttpStatus.OK || response.code === HttpStatus.NO_CONTENT) {
            if (response.code === HttpStatus.OK)
              this.intervals = response.data;

            this.intervalSuccess.type = AlertType.SUCCESS;
            this.intervalSuccess.text = response.message;
          }
          this.costHeaderSuccess.type = AlertType.DANGER;
          this.costHeaderSuccess.text = 'Something went wrong.';
        },
        (error: AppError) => {
          this.costHeaderSuccess.type = AlertType.DANGER;
          this.costHeaderSuccess.text = 'Something went wrong.';
        });
  }

  getTransactionDefinitions(): void {
    this.listSuccess.type = AlertType.INFO
    this.listSuccess.text = 'Fetching Data. Please wait.';

    this.transactionDefinitionService.getAll()
      .subscribe(
        response => {
          if (response.code === HttpStatus.OK || response.code === HttpStatus.NO_CONTENT) {
            if (response.code === HttpStatus.OK)
              this.listSuccess.type = AlertType.SUCCESS;

            this.listSuccess.text = response.message;
            this.transactionDefinitions = response.data;
            return false;
          }

          this.listSuccess.type = AlertType.DANGER;
          this.listSuccess.text = 'Something went wrong.'
        },
        (error: AppError) => {
          this.listSuccess.type = AlertType.DANGER;
          this.listSuccess.text = 'Something went wrong.';
        });
  }

  changeHasParticular(element) {
    this.tranDefForm.amount = null;
  }

  calculateAmount() {
    if (this.tranDefForm.chId) {
      let index = this.tranDefForm.particulars.findIndex(x => x.id == this.tranDefForm.chId);
      this.tranDefForm.particulars[index].amount = null;
    }

    this.tranDefForm.particulars.forEach((item, index) => {
      if (index == 0)
        this.tranDefForm.amount = 0;

      this.tranDefForm.amount += item.amount;
    });

    if (this.tranDefForm.amount == 0) {
      this.tranDefForm.amount = null;
    }
  }

  resetForm(formTransactionDefinition) {
    this.transactionDefinitionsId = 0;
    this.formSuccess = new Alert();
    formTransactionDefinition.reset();
  }

  showDetails(id) {
    let index = this.transactionDefinitions.findIndex(x => x.id == id);
    this.transactionDefinition = this.transactionDefinitions[index];

  }

  save(formTransactionDefinition) {
    this.listSuccess = new Alert();

    this.formSuccess.type = AlertType.INFO;
    this.formSuccess.text = 'Saving Data. Please Wait.';

    this.transactionDefinitionService.save(this.tranDefForm)
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

            this.formSuccess.type = AlertType.SUCCESS;
            this.formSuccess.text = response.message;
            return false;
          }

          this.formSuccess.type = AlertType.DANGER;
          this.formSuccess.text = 'Something went wrong.';
        },
        (error: AppError) => {
          this.formSuccess.type = AlertType.DANGER;
          this.formSuccess.text = 'Something went wrong.';
        });
  }
}

import {Component, OnInit} from '@angular/core';
import { AlertPromise } from 'selenium-webdriver';
import { AlertType } from '../../../class/enum/AlertType';
import { Alert } from '../../../class/common/Alert';
import { CostHeader } from '../model/CostHeader';
import { CostHeaderAlert } from '../model/CostHeaderAlert';
import { CostHeaderService } from '../service/CostHeaderService';
import { ValidationType } from '../../../class/enum/ValidationType';
import { HttpStatus } from '../../../class/common/HttpStatus';
import { AppError } from '../../../class/error/app-error';

@Component({
  selector: 'app-cost-header',
  templateUrl: './cost-header.component.html',
  styleUrls: ['./cost-header.component.css']
})
export class CostHeaderComponent implements OnInit {

  private costHeaderId: number = 0;
  private formAlert: Alert = new Alert();
  private listAlert: Alert = new Alert();
  private AlertType = AlertType;

  private costHeader: CostHeader = new CostHeader();
  private costHeaderAlert: CostHeaderAlert = new CostHeaderAlert();
  private costHeaders: Array<CostHeader> = new Array<CostHeader>();

  constructor(private costHeaderService: CostHeaderService) { }

  ngOnInit() {
    this.costHeaderAlert = {
      name: {
        activityType: {show: 0, type: null, text: null},
        validation: [
          {validationType: ValidationType.REQUIRED, text: 'Cost Header is Mandatory.'},
          {validationType: ValidationType.VALID, text: 'Cost Header must be Valid.'}
        ]
      }
    }

    this.getCostHeaders();
  }

  getCostHeaders(): void {
    this.listAlert.type = AlertType.INFO;
    this.listAlert.text = 'Fetching Data. Please Wait.';

    this.costHeaderService.getAll()
      .subscribe(
        response => {
          if (response.code === HttpStatus.NO_CONTENT || response.code === HttpStatus.OK) {
            if (response.code === HttpStatus.NO_CONTENT)
              this.costHeaders = new Array<CostHeader>();
            else
              this.costHeaders = response.data.costHeaders;

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

  resetForm(formCostHeader) {
    this.costHeaderId = 0;
    this.formAlert = new Alert();
    formCostHeader.reset();
  }

  edit(id) {
    this.listAlert = new Alert();

    this.costHeaderId = id;
    this.formAlert.type = AlertType.INFO;
    this.formAlert.text = 'Fetching Data. Please Wait.';

    this.costHeaderService.getById(this.costHeaderId)
      .subscribe(
        response => {
          if (response.code === HttpStatus.OK) {
            this.costHeader = response.data.costHeader;

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

  save(formCostHeader) {
    this.listAlert = new Alert();

    this.formAlert.type = AlertType.INFO;
    this.formAlert.text = 'Saving Data. Please Wait.';

    this.costHeaderService.save(this.costHeaderId, this.costHeader)
      .subscribe(
        response => {
          if (response.code === HttpStatus.OK) {
            if (this.costHeaders.findIndex(x => x.id == response.data.costHeader.id) == -1) {
              this.costHeaders.splice(0, 0, response.data.costHeader);
            } else {
              let index = this.costHeaders.findIndex(x => x.id == response.data.costHeader.id);
              this.costHeaders.splice(index, 1, response.data.costHeader);
            }

            this.costHeaderId = 0;
            formCostHeader.reset();

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
    this.costHeader = new CostHeader();
    this.formAlert = new Alert();

    this.costHeaderId = id;
    this.listAlert.type = AlertType.INFO;
    this.listAlert.text = 'Deleting Data. Please Wait.';

    this.costHeaderService.delete(this.costHeaderId)
      .subscribe(
        response => {
          if (response.code === HttpStatus.NO_CONTENT) {
            let index = this.costHeaders.findIndex(x => x.id == this.costHeaderId);
            this.costHeaders.splice(index, 1);
            this.costHeaderId = 0;

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
}

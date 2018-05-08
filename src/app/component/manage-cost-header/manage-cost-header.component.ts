import { Component, OnInit } from '@angular/core';
import { CostHeader } from '../../classes/render/CostHeader';
import { CostHeaderService } from '../../service/costHeader.service';
import { CostHeaderForm } from '../../classes/io/CostHeaderForm';

import { AppError } from '../../classes/error/app-error';

import { HttpStatus } from '../../classes/common/HttpStatus';
import { AlertType } from '../../classes/enum/AlertType';
import { Alert } from '../../classes/render/Alert';

@Component({
  selector: 'app-manage-cost-header',
  templateUrl: './manage-cost-header.component.html',
  styleUrls: ['./manage-cost-header.component.css']
})
export class ManageCostHeaderComponent implements OnInit {

  private costHeaderId: number = 0;
  private formSuccess: Alert = new Alert();
  private listSuccess: Alert = new Alert();
  private AlertType = AlertType;

  private costHeaderForm: CostHeaderForm = new CostHeaderForm();
  private costHeaders: Array<CostHeader> = new Array<CostHeader>();

  constructor(private costHeaderService: CostHeaderService) { }

  ngOnInit() {
    this.getCostHeaders();
  }

  getCostHeaders(): void {
    this.listSuccess.type = AlertType.INFO;
    this.listSuccess.text = 'Fetching Data. Please Wait.';

    this.costHeaderService.getAll()
      .subscribe(
        response => {
          if (response.code === HttpStatus.NO_CONTENT) {
            this.costHeaders = new Array<CostHeader>();

            this.listSuccess.type = AlertType.SUCCESS;
            this.listSuccess.text = response.message;
            return false;
          }

          if (response.code === HttpStatus.OK) {
            this.costHeaders = response.data.costHeaders;

            this.listSuccess.type = AlertType.SUCCESS;
            this.listSuccess.text = response.message;
            return false;
          }

          this.listSuccess.type = AlertType.DANGER;
          this.listSuccess.text = "Something went wrong.";
        },
        (error: AppError) => {
          this.listSuccess.type = AlertType.DANGER;
          this.listSuccess.text = 'Something went wrong.';
        });
  }

  resetForm(formCostHeader) {
    this.costHeaderId = 0;
    this.formSuccess = new Alert();
    formCostHeader.reset();
  }

  edit(id) {
    this.listSuccess = new Alert();

    this.costHeaderId = id;
    this.formSuccess.type = AlertType.INFO;
    this.formSuccess.text = 'Fetching Data. Please Wait.';

    this.costHeaderService.getById(this.costHeaderId)
      .subscribe(
        response => {
          if (response.code === HttpStatus.OK) {
            this.costHeaderForm = response.data.costHeader;

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

  save(formCostHeader) {
    this.listSuccess = new Alert();

    this.costHeaderForm = formCostHeader.value;
    this.formSuccess.type = AlertType.INFO;
    this.formSuccess.text = 'Saving Data. Please Wait.';

    this.costHeaderService.save(this.costHeaderId, this.costHeaderForm)
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

  delete(id) {
    this.costHeaderForm = new CostHeaderForm();
    this.formSuccess = new Alert();

    this.costHeaderId = id;
    this.listSuccess.type = AlertType.INFO;
    this.listSuccess.text = 'Deleting Data. Please Wait.';

    this.costHeaderService.delete(this.costHeaderId)
      .subscribe(
        response => {
          if (response.code === HttpStatus.NO_CONTENT) {
            let index = this.costHeaders.findIndex(x => x.id == this.costHeaderId);
            this.costHeaders.splice(index, 1);
            this.costHeaderId = 0;

            this.listSuccess.type = AlertType.SUCCESS;
            this.listSuccess.text = response.message;
            return false;
          }

          this.listSuccess.type = AlertType.DANGER;
          this.listSuccess.text = "Something went wrong.";
        },
        (error: AppError) => {
          this.listSuccess.type = AlertType.DANGER;
          this.listSuccess.text = 'Something went wrong.';
        });
  }
}
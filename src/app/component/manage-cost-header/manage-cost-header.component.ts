import { Component, OnInit } from '@angular/core';
import { CostHeader } from '../../classes/render/CostHeader';
import { CostHeaderService } from '../../service/costHeader.service';
import { CostHeaderForm } from '../../classes/io/CostHeaderForm';

import { AppError } from '../../classes/error/app-error';
import { BadInputError } from '../../classes/error/bad-input';

import { Success } from '../../classes/render/Success';
import { SuccessFlag } from '../../classes/enum/SuccessFlag';

@Component({
  selector: 'app-manage-cost-header',
  templateUrl: './manage-cost-header.component.html',
  styleUrls: ['./manage-cost-header.component.css']
})
export class ManageCostHeaderComponent implements OnInit {

  private costHeaderId: number = 0;
  private formSuccess: Success = new Success();
  private SuccessFlag = SuccessFlag;
  private listSuccess: Success = new Success();

  private costHeaderForm: CostHeaderForm = new CostHeaderForm();

  private costHeaders: Array<CostHeader> = new Array<CostHeader>();

  constructor(private costHeaderService: CostHeaderService) { }

  ngOnInit() {
    this.getCostHeaders();
  }

  getCostHeaders(): void {
    this.formSuccess = new Success();

    this.listSuccess.flag = SuccessFlag.PENDING;
    this.listSuccess.message = 'Getting Data. Please Wait.';

    this.costHeaderService.getAll()
      .subscribe(
        response => {
          if (response.error === 200) {
            this.costHeaders = response.data;
            this.listSuccess.flag = SuccessFlag.SUCCESS;
            this.listSuccess.message = '';
            return false;
          } else if (response.error === 203) {
            this.listSuccess.flag = SuccessFlag.FAILURE;
            this.listSuccess.message = response.message;
            return false;
          }

          this.listSuccess.flag = SuccessFlag.FAILURE;
          this.listSuccess.message = "Something went wrong. please try again.";
        },
        (error: AppError) => {
          this.listSuccess.flag = SuccessFlag.FAILURE;
          this.listSuccess.message = 'Something went wrong.';
        });
  }

  edit(id) {
    this.listSuccess = new Success();

    this.costHeaderId = id;
    this.formSuccess.flag = SuccessFlag.PENDING;
    this.formSuccess.message = 'Getting Data. Please Wait.';

    this.costHeaderService.getById(this.costHeaderId)
      .subscribe(
        response => {
          this.costHeaderForm = response.data;
          this.formSuccess.flag = SuccessFlag.FAILURE;
          this.formSuccess.message = 'Data Fetched. Please Update and Save.';
        },
        (error: AppError) => {
          this.formSuccess.flag = SuccessFlag.FAILURE;
          this.formSuccess.message = 'Something went wrong.';
        });
  }

  save(formCostHeader) {
    this.listSuccess = new Success();

    this.costHeaderForm = formCostHeader.value;
    this.formSuccess.flag = SuccessFlag.PENDING;
    this.formSuccess.message = 'Saving Data. Please Wait.';

    this.costHeaderService.save(this.costHeaderForm)
      .subscribe((response) => {
        if (this.costHeaders == null) {
          this.costHeaders = new Array<CostHeader>();
          this.costHeaders.push(response.data);
        } else {
          if (this.costHeaders.findIndex(x => x.id == response.data.id) == -1) {
            this.costHeaders.splice(0, 0, response.data);
          } else {
            let index = this.costHeaders.findIndex(x => x.id == response.data.id);
            this.costHeaders.splice(index, 1, response.data);
          }
        }

        this.costHeaderId = 0;
        formCostHeader.reset();

        this.formSuccess.flag = SuccessFlag.SUCCESS;
        this.formSuccess.message = response.message;
      },
        (error: AppError) => {
          this.formSuccess.flag = SuccessFlag.FAILURE;
          this.formSuccess.message = 'Something went wrong.';
        });
  }

  delete(id) {
    this.costHeaderForm = new CostHeaderForm();
    this.formSuccess = new Success();

    this.costHeaderId = id;
    this.listSuccess.flag = SuccessFlag.PENDING;
    this.listSuccess.message = 'Deleting Data. Please Wait.';

    this.costHeaderService.delete(this.costHeaderId)
      .subscribe(response => {
        if (response.error === 200) {
          let index = this.costHeaders.findIndex(x => x.id == this.costHeaderId);
          this.costHeaders.splice(index, 1);
          this.listSuccess.flag = SuccessFlag.SUCCESS;
          this.listSuccess.message = 'Data Deleted Successfully.';
        } else {
          this.listSuccess.flag = SuccessFlag.FAILURE;
          this.listSuccess.message = "Data Deletion Failed.";
        }
      },
        (error: AppError) => {
          this.listSuccess.flag = SuccessFlag.FAILURE;
          this.listSuccess.message = 'Something went wrong.';
        });
  }

}

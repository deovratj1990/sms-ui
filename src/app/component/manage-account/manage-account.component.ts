import { Component, OnInit } from '@angular/core';
import { Accounts } from '../../classes/render/Accounts';
import { AccountsService } from '../../service/accounts.service';
import { AccountsForm } from '../../classes/io/AccountsForm';

import { AppError } from '../../classes/error/app-error';
import { BadInputError } from '../../classes/error/bad-input';

import { Success } from '../../classes/render/Success';
import { SuccessFlag } from '../../classes/enum/SuccessFlag';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {

  private accountsId: number = 0;
  private SuccessFlag = SuccessFlag;
  private formSuccess: Success = new Success();
  private listSuccess: Success = new Success();

  private accountForm: AccountsForm = new AccountsForm();

  private accounts: Array<Accounts> = new Array<Accounts>();

  constructor(private accountsService: AccountsService) { }

  ngOnInit() {
    this.getCostHeaders();
  }

  getCostHeaders(): void {
    this.formSuccess = new Success();

    this.listSuccess.flag = SuccessFlag.PENDING;
    this.listSuccess.message = 'Getting Data. Please Wait.';

    this.accountsService.getAll()
      .subscribe(
        response => {
          if (response.error === 200) {
            this.accounts = response.data;
            this.listSuccess.flag = SuccessFlag.SUCCESS;
            this.listSuccess.message = '';
            return false;
          } else if (response.error === 203) {
            this.listSuccess.flag = SuccessFlag.SUCCESS;
            this.listSuccess.message = response.message;
            return false;
          }

          this.listSuccess.flag = SuccessFlag.SUCCESS;
          this.listSuccess.message = "Something went wrong. please try again.";
        },
        (error: AppError) => {
          this.listSuccess.flag = SuccessFlag.SUCCESS;
          this.listSuccess.message = 'Something went wrong.';
        });
  }

  edit(id) {
    this.listSuccess = new Success();
   
    this.accountsId = id;
    this.formSuccess.flag = SuccessFlag.PENDING;
    this.formSuccess.message = 'Getting Data. Please Wait.';

    this.accountsService.getById(this.accountsId)
      .subscribe(response => {
        this.accountForm = response.data;
        this.formSuccess.flag = SuccessFlag.SUCCESS;
        this.formSuccess.message = 'Data Fetched. Please Update and Save.';
      },
        (error: AppError) => {
          this.formSuccess.flag = SuccessFlag.SUCCESS;
          this.formSuccess.message = 'Something went wrong.';
        });
  }

  save(formAccounts) {
    this.listSuccess = new Success();

    this.accountForm = formAccounts.value;
    this.formSuccess.flag = SuccessFlag.PENDING;
    this.formSuccess.message = 'Saving Data. Please Wait.';

    this.accountsService.save(this.accountsId, this.accountForm)
      .subscribe(
        response => {
          if (this.accounts == null) {
            this.accounts = new Array<Accounts>();
            this.accounts.push(response.data);
          } else {
            if (this.accounts.findIndex(x => x.id == response.data.id) == -1) {
              this.accounts.splice(0, 0, response.data);
            } else {
              let index = this.accounts.findIndex(x => x.id == response.data.id);
              this.accounts.splice(index, 1, response.data);
            }
          }

          this.accountsId = 0;
          formAccounts.reset();

          this.formSuccess.flag = SuccessFlag.SUCCESS;
          this.formSuccess.message = response.message;
        },
        (error: AppError) => {
          this.formSuccess.flag = SuccessFlag.SUCCESS;
          this.formSuccess.message = 'Something went wrong.';
        });
  }

  delete(id) {
    this.accountForm = new AccountsForm();
    this.formSuccess = new Success();

    this.accountsId = id;
    this.listSuccess.flag = SuccessFlag.PENDING;
    this.listSuccess.message = 'Deleting Data. Please Wait.';

    this.accountsService.delete(this.accountsId)
      .subscribe(response => {
        if (response.error === 200) {
          let index = this.accounts.findIndex(x => x.id == this.accountsId);
          this.accounts.splice(index, 1);
          this.listSuccess.flag = SuccessFlag.SUCCESS;
          this.listSuccess.message = 'Data Deleted Successfully.';
        } else {
          this.listSuccess.flag = SuccessFlag.SUCCESS;
          this.listSuccess.message = "Data Deletion Failed.";
        }
      },
      (error: AppError) => {
        this.listSuccess.flag = SuccessFlag.SUCCESS;
        this.listSuccess.message = 'Something went wrong.';
      });
  }
}

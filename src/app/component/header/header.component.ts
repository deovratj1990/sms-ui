import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/user/login/Login.service';
import { TransactionDefinitionService } from '../../service/accounting/transaction-definition/TransactionDefinition.service';
import { HttpStatus } from '../../model/common/HttpStatus';
import { TransactionDefinitionComponent } from '../accounting/transaction-definition/transaction-definition.component';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private transactionDefinitions: Array<{ id: number, name: string }> = new Array<{ id: number, name: string }>();
  private payTransactionDefinition: Array<{ id: number, name: string }> = new Array<{ id: number, name: string }>();
  private collectTransactionDefinition: Array<{ id: number, name: string }> = new Array<{ id: number, name: string }>();

  constructor(
    private loginService: LoginService,
    private transactionDefinitionService: TransactionDefinitionService,
  ) { }

  ngOnInit() {
    this.transactionDefinitionService.transactionDefinitionUpdates.subscribe(response => {
      if (response.code === HttpStatus.CREATED) {
        if (response.data.transactionDefinition.transactionTo == 'SOCIETY') {

          if (this.collectTransactionDefinition.findIndex(x => x.id == response.data.transactionDefinition.id) == -1) {
            this.collectTransactionDefinition.splice(0, 0, {
              id: response.data.transactionDefinition.id,
              name: response.data.transactionDefinition.costHeader.name
            });
          } else {
            let index = this.collectTransactionDefinition.findIndex(x => x.id == response.data.transactionDefinition.id);
            this.collectTransactionDefinition.splice(index, 1, {
              id: response.data.transactionDefinition.id,
              name: response.data.transactionDefinition.costHeader.name
            });
          }

        } else {

          if (this.payTransactionDefinition.findIndex(x => x.id == response.data.transactionDefinition.id) == -1) {
            this.payTransactionDefinition.splice(0, 0, {
              id: response.data.transactionDefinition.id,
              name: response.data.transactionDefinition.costHeader.name
            });
          } else {
            let index = this.payTransactionDefinition.findIndex(x => x.id == response.data.transactionDefinition.id);
            this.payTransactionDefinition.splice(index, 1, {
              id: response.data.transactionDefinition.id,
              name: response.data.transactionDefinition.costHeader.name
            });
          }
          
        }
      }
    });

    if(this.loginService.isLoggedIn() == true) {
      this.getTransactionDefinition();
    }
  }

  getTransactionDefinition(): void {
    this.transactionDefinitionService.getAll()
      .subscribe(response => {
        if (response.code === HttpStatus.OK) {
          Object.keys(response.data.transactionDefinitions).forEach(element => {
            if (response.data.transactionDefinitions[element].transactionTo == 'SOCIETY') {
              this.collectTransactionDefinition.push({
                id: response.data.transactionDefinitions[element].id,
                name: response.data.transactionDefinitions[element].costHeader.name
              })
            } else {
              this.payTransactionDefinition.push({
                id: response.data.transactionDefinitions[element].id,
                name: response.data.transactionDefinitions[element].costHeader.name
              })
            }
          });
        }
      })
  }

  logout() {
    this.loginService.logout();
  }
}

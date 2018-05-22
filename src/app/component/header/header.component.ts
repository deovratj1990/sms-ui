import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/user/login/Login.service';
import { TransactionDefinitionService } from '../../service/accounting/transaction-definition/TransactionDefinition.service';
import { HttpStatus } from '../../model/common/HttpStatus';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private payTransactionDefinition: Array<{id: number, name: string}> = new Array<{id: number, name: string}>();
  private collectTransactionDefinition: Array<{id: number, name: string}> = new Array<{id: number, name: string}>();

  constructor(
    private loginService: LoginService,
    private transactionDefinitionService: TransactionDefinitionService
  ) { }

  ngOnInit() {
    this.getTransactionDefinition();
   }

   getTransactionDefinition(): void {
     this.transactionDefinitionService.getAll()
      .subscribe(response => {
        if(response.code === HttpStatus.OK) {
          Object.keys(response.data.transactionDefinitions).forEach(element => {
            if(response.data.transactionDefinitions[element].transactionTo == 'SOCIETY') {
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

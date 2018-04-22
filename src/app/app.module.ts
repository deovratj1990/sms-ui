import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RoutingModule } from './routerModule/routing.module';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ManageAccountComponent } from './component/manage-account/manage-account.component';
import { ManageCostHeaderComponent } from './component/manage-cost-header/manage-cost-header.component';
import { ManageTransactionDefinitionComponent } from './component/manage-transaction-definition/manage-transaction-definition.component';
import { ManageVoucherComponent } from './component/manage-voucher/manage-voucher.component';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';

import { AppErrorHandler } from './classes/error/app-error-handler';

import { AuthGuard } from './service/auth-guard.service';
import { LoginService } from './service/login.service';
import { RegistrationService } from './service/registration.service';
import { SocietyService } from './service/society.service';
import { RoomService } from './service/room.service';
import { AccountsService } from './service/accounts.service';
import { CostHeaderService } from './service/costHeader.service';
import { TransactionDefinitionService } from './service/transactionDefinition.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    ManageAccountComponent,
    ManageCostHeaderComponent,
    ManageTransactionDefinitionComponent,
    ManageVoucherComponent,
    LoginComponent,
    RegistrationComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    LoginService,
    AuthGuard,
    SocietyService,
    RoomService,
    RegistrationService,
    CostHeaderService,
    AccountsService,
    TransactionDefinitionService,
    { provide: AppErrorHandler, useClass: ErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

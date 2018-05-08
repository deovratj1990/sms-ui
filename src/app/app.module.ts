import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RoutingModule } from './routerModule/routing.module';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ManageCostHeaderComponent } from './component/manage-cost-header/manage-cost-header.component';
import { ManageTransactionDefinitionComponent } from './component/manage-transaction-definition/manage-transaction-definition.component';
import { ManageVoucherComponent } from './component/manage-voucher/manage-voucher.component';
import { LoginComponent } from './component/login/login.component';
import { MemberRegistrationComponent } from './component/member-registration/member-registration.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { AlertResponseComponent } from './component/alert-response/alert-response.component';
import { FormElementStatusComponent } from './component/form-element-status/form-element-status.component';

import { AppErrorHandler } from './classes/error/app-error-handler';

import { AuthGuard } from './service/auth-guard.service';
import { LoginService } from './service/login.service';
import { MemberRegistrationService } from './service/member-registration.service';
import { SocietyService } from './service/society.service';
import { RoomService } from './service/room.service';
import { CostHeaderService } from './service/costHeader.service';
import { TransactionDefinitionService } from './service/transactionDefinition.service';

import { MyDatePickerModule } from 'mydatepicker';
import { SocietyRegistrationComponent } from './component/society-registration/society-registration.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    MemberRegistrationComponent,
    SocietyRegistrationComponent,
    DashboardComponent,
    ManageCostHeaderComponent,
    ManageTransactionDefinitionComponent,
    ManageVoucherComponent,
    PageNotFoundComponent,
    AlertResponseComponent,
    FormElementStatusComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpModule,
    FormsModule,
    MyDatePickerModule
  ],
  providers: [
    LoginService,
    AuthGuard,
    SocietyService,
    RoomService,
    MemberRegistrationService,
    CostHeaderService,
    TransactionDefinitionService,
    { provide: AppErrorHandler, useClass: ErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

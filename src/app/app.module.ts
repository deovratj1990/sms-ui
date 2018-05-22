import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';

import { MyDatePickerModule } from 'mydatepicker';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './component/user/login/login.component';
import { MemberRegistrationComponent } from './component/user/member-registration/member-registration.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CostHeaderComponent } from './component/accounting/cost-header/cost-header.component';
import { TransactionDefinitionComponent } from './component/accounting/transaction-definition/transaction-definition.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { AlertResponseComponent } from './component/alert/alert.component';
import { ValidationErrorComponent } from './component/validation-error/validation-error.component';

import { RoutingModule } from './module/routerModule/Routing.module';
import { LoginService } from './service/user/login/Login.service';
import { AuthGuard } from './service/auth/Auth.service';
import { SocietyService } from './service/society/society/Society.service';
import { RoomService } from './service/society/room/Room.service';
import { CostHeaderService } from './service/accounting/cost-header/CostHeader.service';
import { MemberRegistrationService } from './service/user/member-registration/MemberRegistration.service';
import { TransactionDefinitionService } from './service/accounting/transaction-definition/TransactionDefinition.service';
import { StaticFormContentService } from './service/staticFormContent/StaticFormContent.service';
import { AppErrorHandler } from './model/error/app-error-handler';
import { RequestInteceptor } from './service/interceptor/RequestInterceptor.service';
import { VoucherComponent } from './component/voucher/voucher.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    MemberRegistrationComponent,
    DashboardComponent,
    CostHeaderComponent,
    TransactionDefinitionComponent,
    PageNotFoundComponent,
    AlertResponseComponent,
    ValidationErrorComponent,
    VoucherComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
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
    StaticFormContentService,
    { provide: AppErrorHandler, useClass: ErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInteceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

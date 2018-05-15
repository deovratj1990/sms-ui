import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RoutingModule } from './routerModule/routing.module';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';

import { AppErrorHandler } from './class/error/app-error-handler';

import { MyDatePickerModule } from 'mydatepicker';
import { HeaderComponent } from './common/header/component/header.component';
import { DashboardComponent } from './common/dashboard/component/dashboard.component';
import { LoginComponent } from './user/login/component/login.component';
import { MemberRegistrationComponent } from './user/member-registration/component/member-registration.component';
import { CostHeaderComponent } from './accounting/cost-header/component/cost-header.component';
import { TransactionDefinitionComponent } from './accounting/transaction/definition/component/transaction-definition.component';
import { PageNotFoundComponent } from './common/page-not-found/component/page-not-found.component';
import { AlertComponent } from './common/alert/component/alert.component';
import { ValidationErrorComponent } from './common/validation-error/component/validation-error.component';

import { LoginService } from './user/login/service/LoginService';
import { AuthGuard } from './common/auth/class/AuthService';
import { SocietyService } from './society/service/SocietyService';
import { RoomService } from './society/wing/room/service/RoomService';
import { MemberRegistrationService } from './user/member-registration/service/MemberRegistrationService';
import { CostHeaderService } from './accounting/cost-header/service/CostHeaderService';
import { TransactionDefinitionService } from './accounting/transaction/definition/service/TransactionDefinitionService';
import { StaticFormContentService} from "./common/staticFormContent/service/StaticFormContentService";


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
    AlertComponent,
    ValidationErrorComponent,
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
    StaticFormContentService,
    { provide: AppErrorHandler, useClass: ErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

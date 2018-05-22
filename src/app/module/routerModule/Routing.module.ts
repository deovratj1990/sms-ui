import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "../../component/dashboard/dashboard.component";
import { CostHeaderComponent } from "../../component/accounting/cost-header/cost-header.component";
import { TransactionDefinitionComponent } from "../../component/accounting/transaction-definition/transaction-definition.component";
import { LoginComponent } from "../../component/user/login/login.component";
import { MemberRegistrationComponent } from "../../component/user/member-registration/member-registration.component";
import { PageNotFoundComponent } from "../../component/page-not-found/page-not-found.component";
import { AuthGuard } from "../../service/auth/Auth.service";
import { VoucherComponent } from "../../component/voucher/voucher.component";

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'cost-header', component: CostHeaderComponent, canActivate: [AuthGuard] },
    { path: 'transaction-definition', component: TransactionDefinitionComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'member-registration', component: MemberRegistrationComponent },
    { path: 'voucher/:id', component: VoucherComponent },
    { path: '**', component: PageNotFoundComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: []
})
export class RoutingModule {

}

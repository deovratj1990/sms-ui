import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "../component/dashboard/dashboard.component";
import { ManageCostHeaderComponent } from "../component/manage-cost-header/manage-cost-header.component";
import { ManageTransactionDefinitionComponent } from "../component/manage-transaction-definition/manage-transaction-definition.component";
import { ManageVoucherComponent } from "../component/manage-voucher/manage-voucher.component";
import { LoginComponent } from "../component/login/login.component";
import { MemberRegistrationComponent } from "../component/member-registration/member-registration.component";
import { AuthGuard } from "../service/auth-guard.service";
import { PageNotFoundComponent } from "../component/page-not-found/page-not-found.component";
import { SocietyRegistrationComponent } from "../component/society-registration/society-registration.component";

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'manage-cost-header', component: ManageCostHeaderComponent, canActivate: [AuthGuard] },
    { path: 'manage-transaction-definition', component: ManageTransactionDefinitionComponent, canActivate: [AuthGuard] },
    { path: 'manage-voucher', component: ManageVoucherComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'member-registration', component: MemberRegistrationComponent },
    { path: 'society-registration', component: SocietyRegistrationComponent },
    { path: '**', component: PageNotFoundComponent } 
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: []
})
export class RoutingModule {

}
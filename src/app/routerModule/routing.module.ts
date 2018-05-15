import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "../common/dashboard/component/dashboard.component";
import { AuthGuard } from "../common/auth/class/AuthService";
import { CostHeaderComponent } from "../accounting/cost-header/component/cost-header.component";
import { TransactionDefinitionComponent } from "../accounting/transaction/definition/component/transaction-definition.component";
import { LoginComponent } from "../user/login/component/login.component";
import { MemberRegistrationComponent } from "../user/member-registration/component/member-registration.component";
import { PageNotFoundComponent } from "../common/page-not-found/component/page-not-found.component";

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'cost-header', component: CostHeaderComponent, canActivate: [AuthGuard] },
    { path: 'transaction-definition', component: TransactionDefinitionComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'member-registration', component: MemberRegistrationComponent },
    { path: '**', component: PageNotFoundComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: []
})
export class RoutingModule {

}

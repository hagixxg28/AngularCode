import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MarketMenuComponent } from '../components/market-menu/market-menu.component';
import { MarketComponent } from '../components/market/market.component';
import { FooterComponent } from '../components/footer/footer.component';
import { CustomerCouponsComponent } from '../components/customer-coupons/customer-coupons.component';
import { LoginGuardService } from '../services/login-guard.service';
import { NewLoginComponent } from '../components/login/new-login.component';
import { GenaralControlPanelComponent } from '../components/genaral-control-panel/genaral-control-panel.component';
import { CompanyCouponsComponent } from '../components/company-coupons/company-coupons.component';
import { AddCouponComponent } from '../components/add-coupon/add-coupon.component';
import { LoginAdminGuardService } from '../services/login-admin-guard.service';
import { AdministratorComponent } from '../components/administrator/administrator.component';
import { AddUserComponent } from '../components/add-user/add-user.component';
import { AboutComponent } from '../components/about/about.component';

const routes: Routes = [
  { path: 'Login', component: NewLoginComponent },
  { path: 'About', component: AboutComponent },
  { path: 'Home', component: MarketMenuComponent, children: [{ path: '', component: MarketComponent }] },
  { path: 'Home', component: MarketMenuComponent, children: [{ path: 'Market', component: MarketComponent }] },
  { path: 'Home', component: MarketMenuComponent, canActivate: [LoginGuardService], children: [{ path: 'MyCouopns', component: CustomerCouponsComponent }] },
  { path: 'Home', component: MarketMenuComponent, canActivate: [LoginGuardService], children: [{ path: 'CompanyCoupons', component: CompanyCouponsComponent }] },
  { path: 'Home', component: MarketMenuComponent, canActivate: [LoginGuardService], children: [{ path: 'ControlPanel', component: GenaralControlPanelComponent }] },
  { path: 'Home', component: MarketMenuComponent, canActivate: [LoginGuardService], children: [{ path: 'Add', component: AddCouponComponent }] },
  { path: 'Home', component: MarketMenuComponent, canActivate: [LoginAdminGuardService], children: [{ path: 'Admin', component: AdministratorComponent, children: [{ path: 'Details', component: GenaralControlPanelComponent }] }] },
  { path: 'Home', component: MarketMenuComponent, canActivate: [LoginAdminGuardService], children: [{ path: 'Admin', component: AdministratorComponent, children: [{ path: 'CompanyCoupons', component: CompanyCouponsComponent }] }] },
  { path: 'Home', component: MarketMenuComponent, canActivate: [LoginAdminGuardService], children: [{ path: 'Admin', component: AdministratorComponent, children: [{ path: 'CustomerCoupons', component: CustomerCouponsComponent }] }] },
  { path: 'Home', component: MarketMenuComponent, canActivate: [LoginAdminGuardService], children: [{ path: 'AddUser', component: AddUserComponent }] },
  { path: "", redirectTo: "Home", pathMatch: "full" }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutesModule { }

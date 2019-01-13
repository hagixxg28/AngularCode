import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';


import { RouterModule } from '@angular/router';
import { RoutesModule } from './routes.module';

import { LayoutComponent } from '../components/layout/layout.component';
import { FooterComponent } from '../components/footer/footer.component';
import { MenuComponent } from '../components/menu/menu.component';
import { MarketComponent } from '../components/market/market.component';
import { AdministratorComponent } from '../components/administrator/administrator.component';
import { MarketMenuComponent } from '../components/market-menu/market-menu.component';
import { GeneralFilterComponent } from '../components/generalFilter/filter.component';
import { CustomerCouponsComponent } from '../components/customer-coupons/customer-coupons.component';
import { CustomerFilterComponent } from '../components/customer-filter/customer-filter.component';
import { NewLoginComponent } from '../components/login/new-login.component';
import { GenaralControlPanelComponent } from '../components/genaral-control-panel/genaral-control-panel.component';
import { CompanyFilterComponent } from '../components/company-filter/company-filter.component';
import { CompanyCouponsComponent } from '../components/company-coupons/company-coupons.component';
import { UpdateFormComponent } from '../components/update-form/update-form.component';
import { AddCouponComponent } from '../components/add-coupon/add-coupon.component';
import { AllCustomerComponent } from '../components/all-customer/all-customer.component';
import { AddCompanyComponent } from '../components/add-company/add-company.component';
import { AddUserComponent } from '../components/add-user/add-user.component';
import { AboutComponent } from '../components/about/about.component';
import { MainNavComponent } from '../components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    MenuComponent,
    MarketComponent,
    AdministratorComponent,
    GeneralFilterComponent,
    MarketMenuComponent,
    CustomerCouponsComponent,
    CustomerFilterComponent,
    NewLoginComponent,
    GenaralControlPanelComponent,
    CompanyFilterComponent,
    CompanyCouponsComponent,
    UpdateFormComponent,
    AddCouponComponent,
    AllCustomerComponent,
    AddCompanyComponent,
    AddUserComponent,
    AboutComponent,
    MainNavComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    RoutesModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule

  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }

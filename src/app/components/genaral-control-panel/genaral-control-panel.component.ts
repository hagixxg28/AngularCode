import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AllDataService } from 'src/app/services/all-data.service';
import { UserDetails } from 'src/app/models/UserDetails';
import { CustomerService } from 'src/app/services/customer.service';
import { CompanyService } from 'src/app/services/company.service';
import { Customer } from 'src/app/models/Customer';
import { Company } from 'src/app/models/Company';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genaral-control-panel',
  templateUrl: './genaral-control-panel.component.html',
  styleUrls: ['./genaral-control-panel.component.css']
})
export class GenaralControlPanelComponent implements OnInit {

  constructor(private dataService: AllDataService, private customerService: CustomerService, private companyService: CompanyService, private router: Router) { }

  ngOnInit() {
    this.dataService.customerCaster.subscribe((customer) => this.customer = customer)
    this.dataService.companyCaster.subscribe((company) => this.company = company)

    if (this.customer.id) {
      const observable = this.customerService.getCustomer(this.customer.id)
      observable.subscribe((customer) => { this.userDetails.name = customer.custName })
      return;
    }
    if (this.company.id) {
      const observable = this.companyService.getCompany(this.company.id)
      observable.subscribe((company) => { this.userDetails.name = company.compName, this.userDetails.email = company.email })
    }
  }
  @Output() public Event = new EventEmitter;

  userDetails: UserDetails = this.getUserDetails();

  newDetails: UserDetails = new UserDetails()

  passwordConfirm: string = "";
  customer: Customer

  company: Company

  test() {
    console.log(this.userDetails.name)
  }


  getUserDetails() {
    return this.dataService.userDetails;
  }

  updateNameCompany() {
    const body: Company = {
      "id": this.company.id,
      "compName": this.newDetails.name,
    }
    this.dataService.updateCompany(body);
    this.Event.emit()
    this.fetchDetails();
  }
  updateNameCustomer() {
    const body: Customer = {
      "id": this.customer.id,
      "custName": this.newDetails.name
    }
    this.dataService.updateCustomer(body);
    this.Event.emit()
    this.fetchDetails();
  }

  updatePasswordCustomer() {
    if (!this.confirmPassword()) {
      alert("Please confrim your password")
      return;
    }
    const body: Customer = {
      "id": this.customer.id,
      "password": this.newDetails.password
    }
    this.dataService.updateCustomer(body);
    this.Event.emit()
    this.fetchDetails();
  }


  updatePasswordCompany() {
    if (!this.confirmPassword()) {
      alert("Please confrim your password")
      return;
    }
    const body: Company = {
      "id": this.company.id,
      "password": this.newDetails.password,
    }
    this.dataService.updateCompany(body);
    this.Event.emit();
    this.fetchDetails();
  }

  updatePasswordUser() {
    if (this.customer.id) {
      this.updatePasswordCustomer();
    } else {
      this.updatePasswordCompany();
    }
  }

  updateNameUser() {
    if (this.customer.id) {
      this.updateNameCustomer();
    } else {
      this.updateNameCompany();
    }
  }


  updateEmail() {
    const body: Company = {
      "id": this.company.id,
      "email": this.newDetails.email,
    }
    this.dataService.updateCompany(body);
    this.fetchDetails();
    this.Event.emit();
  }

  fetchDetails() {
    setTimeout(() => {
      this.ngOnInit()
    }, 50);
  }
  confirmPassword(): boolean {
    if (this.passwordConfirm == this.newDetails.password) {
      return true;
    }
    return false;
  }


}

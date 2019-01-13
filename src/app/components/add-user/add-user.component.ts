import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/Company';
import { Customer } from 'src/app/models/Customer';
import { AllDataService } from 'src/app/services/all-data.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {


  newCompany: Company = new Company();
  newCustomer: Customer = new Customer();
  AddOption;


  constructor(private dataService: AllDataService) { }




  addCompany() {
    this.dataService.createCompany(this.newCompany)
  }

  addCustomer() {
    this.newCustomer.custName = this.newCompany.compName;
    this.newCustomer.id = this.newCompany.id;
    this.newCustomer.password = this.newCompany.password

    this.dataService.createCustomer(this.newCustomer)
  }

}

import { Component, OnInit } from '@angular/core';
import { AllDataService } from 'src/app/services/all-data.service';
import { Company } from 'src/app/models/Company';
import { Customer } from 'src/app/models/Customer';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent {

  newCompany: Company = new Company();
  newCustomer: Customer = new Customer();

  public currentTypeOption: string = "company";

  constructor(private dataService: AllDataService) { }


  setTypeOption(value: string) {
    this.currentTypeOption = value;
  }


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

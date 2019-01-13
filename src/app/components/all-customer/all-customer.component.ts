import { Component, OnInit } from '@angular/core';
import { AllDataService } from 'src/app/services/all-data.service';
import { Customer } from 'src/app/models/Customer';

@Component({
  selector: 'app-all-customer',
  templateUrl: './all-customer.component.html',
  styleUrls: ['./all-customer.component.css']
})
export class AllCustomerComponent implements OnInit {

  constructor(private dataService: AllDataService) { }

  allCustomers: Customer[];

  ngOnInit() {
    this.dataService.setAllCustomers();
    setTimeout(() => {
      this.allCustomers = this.dataService.AllCustomers;
    }, 25);

  }

}

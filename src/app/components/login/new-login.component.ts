import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AllDataService } from 'src/app/services/all-data.service';
import { UserDetails } from 'src/app/models/UserDetails';
import { Customer } from 'src/app/models/Customer';
import { Company } from 'src/app/models/Company';

@Component({
  selector: 'app-new-login',
  templateUrl: './new-login.component.html',
  styleUrls: ['./new-login.component.css']
})
export class NewLoginComponent implements OnInit {


  Url = "http://localhost:8080/CouponFixAttempt/rest/Login"


  userDetails: UserDetails = new UserDetails();
  constructor(private http: HttpClient, private router: Router, private dataService: AllDataService) { }

  ngOnInit() {
  }


  login() {

    const body = {
      "id": this.userDetails.id,
      "password": this.userDetails.password,
      "type": this.userDetails.type
    }
    const Ob = this.http.post(this.Url, body);
    Ob.subscribe(() => {
      sessionStorage.setItem("isLoggedIn", "true"), this.dataService.setUserDetails(this.userDetails), this.dataService.toggleLogin(), this.BehaviorSubjectStter()
      this.router.navigate(["/Home"]);
    },
      () => alert("Incorrect username or password")
    )
  }

  BehaviorSubjectStter() {
    if (this.userDetails.type == "CUSTOMER") {
      let customer: Customer = new Customer();
      customer.id = this.userDetails.id;
      this.dataService.editCurrentCustomer(customer)
    }
    if (this.userDetails.type == "COMPANY") {
      let company: Company = new Company();
      company.id = this.userDetails.id;
      this.dataService.editCurrentCompany(company)
    }
  }

}


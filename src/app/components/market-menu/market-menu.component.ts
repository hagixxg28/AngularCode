import { Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/models/UserDetails';
import { AllDataService } from 'src/app/services/all-data.service';

@Component({
  selector: 'app-market-menu',
  templateUrl: './market-menu.component.html',
  styleUrls: ['./market-menu.component.css']
})
export class MarketMenuComponent  {
  

  userDetails: UserDetails = this.getUserDetails();

  constructor(private dataService: AllDataService) { }


  changeDetails(value) {
    console.log("Got the emit")
    this.userDetails = value;
  }

  loginBoolean() {
    return this.dataService.userLoggedIn;
  }

  getUserDetails() {
    return this.dataService.userDetails;
  }
}

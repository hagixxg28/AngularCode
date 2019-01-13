import { Component, OnInit } from '@angular/core';
import { AllDataService } from 'src/app/services/all-data.service';
import { Customer } from 'src/app/models/Customer';
import { Company } from 'src/app/models/Company';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

  constructor(private dataService: AllDataService, private router: Router) { }

  companySelected: boolean = this.dataService.getToggleView()

  viewToggler;

  GeneralArray;

  currentUser;
  selectedIndex;

  ngOnInit() {
    if (this.companySelected) {
      this.dataService.setAllCompanies()
      setTimeout(() => {
        this.GeneralArray = this.dataService.AllCompanies
      }, 25);

    } else {
      this.dataService.setAllCustomers()
      setTimeout(() => {
        this.GeneralArray = this.dataService.AllCustomers
      }, 25);
    }

  }

  RemoveUser() {
    if (this.companySelected) {
      this.dataService.deleteCompany(this.currentUser.id)
    } else {
      this.dataService.deleteCustomer(this.currentUser.id)
    }
  }

  toggleUser(index: number) {
    //Sets the index of SelectedIndex and the currentCoupon to the clicked one
    if (!this.isCurrentIndex(index)) {
      this.currentUser = null;
      setTimeout(() => {
        this.currentUser = this.GeneralArray[index];
        this.selectedIndex = index;
        this.editCurrentUser()
      }, 25);
    } else {
      this.clearSelection();
    }
  }

  clearSelection() {
    this.selectedIndex = -1;
    this.currentUser = null;
    this.editCurrentUser();
  }


  isCurrentIndex(index: number) {
    if (this.selectedIndex == index) {
      return true;
    }
    return false;
  }

  editCurrentUser() {
    if (this.companySelected) {
      this.dataService.editCurrentCompany(this.currentUser);
      return;
    }
    this.dataService.editCurrentCustomer(this.currentUser);
  }


  refresh() {
    console.log("I have been called")
    setTimeout(() => {
      this.ngOnInit()
    }, 50);
  }

  switchToCompanyView() {
    if (!this.companySelected) {
      this.clearSelection();
      this.toggleAndRefreshSelection()
      this.dataService.setAllCompanies();
      setTimeout(() => {
        this.GeneralArray = this.dataService.AllCompanies
      }, 25);
      this.router.navigate(["/Home/Admin/Details"]);
    }
  }
  switchToCustomerView() {
    if (this.companySelected) {
      this.clearSelection();
      this.toggleAndRefreshSelection()
      this.companySelected = this.dataService.getToggleView()
      this.dataService.setAllCustomers();
      setTimeout(() => {
        this.GeneralArray = this.dataService.AllCustomers
      }, 25);
      this.router.navigate(["/Home/Admin/Details"]);
    }
  }



  toggleView() {
    if (this.router.url === "/Home/Admin/Details") {
      if (this.companySelected) {
        this.router.navigate(["/Home/Admin/CompanyCoupons"]);
        return;
      }
      this.router.navigate(["/Home/Admin/CustomerCoupons"]);
      return;
    }
    this.router.navigate(["/Home/Admin/Details"]);
    return;
  }

  toggleAndRefreshSelection() {
    this.dataService.toggleView()
    this.companySelected = this.dataService.getToggleView()
  }
}





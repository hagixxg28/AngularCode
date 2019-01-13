import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AllDataService } from 'src/app/services/all-data.service';
import { Coupon } from 'src/app/models/Coupon';
import { UserDetails } from 'src/app/models/UserDetails';

@Component({
  selector: 'app-company-coupons',
  templateUrl: './company-coupons.component.html',
  styleUrls: ['./company-coupons.component.css']
})
export class CompanyCouponsComponent implements OnInit {


  showArray = true;
  //------

  //Coupon Related Variables:
  public selectedIndex: number;
  public currentCoupon: Coupon;
  myCoupons: Coupon[];
  firstCoupon: Coupon;
  userDetails: UserDetails
  constructor(private dataService: AllDataService) { }




  ngOnInit() {
    this.userDetails = this.dataService.userDetails
    this.dataService.setArrayForCompany();
    setTimeout(() => {
      this.myCoupons=this.dataService.getArray(), this.firstCoupon = this.myCoupons[0]
    }, 75);
  }

  changeArray() {
    this.myCoupons = this.dataService.getArray();
  }


  toggleCoupon(index: number) {
    //Sets the index of SelectedIndex and the currentCoupon to the clicked one
    if (!this.isCurrentIndex(index)) {
      this.currentCoupon = this.myCoupons[index];
      this.selectedIndex = index;
      this.editCurrentCoupon();
      return;
    }
    this.clearSelection();
  }

  isCurrentIndex(index: number) {
    if (this.selectedIndex == index) {
      return true;
    }
    return false;
  }

  updateCouopn(eventCoupon) {
    eventCoupon.id = this.currentCoupon.id
    this.dataService.updateCoupon(eventCoupon)
    setTimeout(() => {
      this.clearSelection(), this.fetchDetails()
    }, 25);
  }

  deleteCoupon() {
    this.dataService.deleteCoupon(this.currentCoupon.id)
    setTimeout(() => {
      this.clearSelection(), this.fetchDetails()
    }, 25);
  }


  fetchDetails() {
    this.ngOnInit()
  }

  editCurrentCoupon() {
    this.dataService.editCurrentCoupon(this.currentCoupon);
  }

  clearSelection() {
    this.selectedIndex = -1;
    this.currentCoupon = null;
    this.editCurrentCoupon();
  }

}

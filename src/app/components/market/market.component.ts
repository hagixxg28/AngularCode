import { Component, OnInit, EventEmitter } from '@angular/core';
import { Coupon } from 'src/app/models/Coupon';
import { CouponService } from 'src/app/services/coupon.service';
import { AllDataService } from 'src/app/services/all-data.service';
import { UserDetails } from 'src/app/models/UserDetails';



@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  //The Array itself----
  public marketArray: Coupon[];
  public ownedCoupons: Coupon[];
  showArray = true;
  //------

  //Coupon Related Variables:
  public selectedIndex: number;
  public currentCoupon: Coupon;
  public displayCoupon: Coupon;
  public tempCoupon: Coupon;
  //-------

  //General Client variables:

  userDetails: UserDetails;
  clientEventEmitter = new EventEmitter();

  //---------
  constructor(private marketService: CouponService, private dataService: AllDataService) { }

  ngOnInit() {
    this.dataService.setAllCoupons();
    setTimeout(() => {
      this.marketArray = this.dataService.getAllCoupons();
    }, 0);

    this.userDetails = this.dataService.userDetails;

    if (this.userDetails.type == 'CUSTOMER') {
      this.dataService.setArrayForCustomer()
      setTimeout(() => {
        this.ownedCoupons = this.dataService.getArray()
      }, 25);
    }

  }


  //Coupon Arrangment Methods:
  //-------------------------------

  changeArray() {
    this.marketArray = this.dataService.getArray();
  }
  setTempCoupon(coupId: number) {
    this.marketService.getCoupon(coupId).subscribe(coupon => this.tempCoupon = coupon);
  }

  toggleCoupon(index: number) {
    //Sets the index of SelectedIndex and the currentCoupon to the clicked one
    if (!this.isCurrentIndex(index)) {
      this.currentCoupon = this.marketArray[index];
      this.selectedIndex = index;
      if (this.isAdmin()) {
        this.editCurrentCoupon()
      }
      return;
    }
    this.clearSelection();
  }

  //-----------------------------
  //Toggle and Boolean checking methods:

  isCurrentIndex(index: number) {
    if (this.selectedIndex == index) {
      return true;
    }
    return false;
  }

  getCoupon(coupId: number) {
    this.setTempCoupon(coupId);
    return this.tempCoupon;
  }
  isCompanyOwned() {
    return (this.currentCoupon.compId == this.userDetails.id && this.userDetails.type == "COMPANY");
  }

  isCustomerAvailable(): boolean {
    let bool = true;
    if (this.dataService.userDetails.type == "CUSTOMER") {
      this.ownedCoupons.forEach(Coupon => {
        if (Coupon.id == this.currentCoupon.id) {
          bool = false;
        }
      });
    } else {
      bool = false;
    }
    return bool;
  }

  isAdmin() {
    return (this.userDetails.type == "ADMIN");
  }

  //Customer Purchase
  purchase() {
    this.dataService.purchaseCoupon(this.currentCoupon.id)
  }

  //----

  //Admin Methods

  adminUpdateCoupon(updateCoupon) {
    updateCoupon.id = this.currentCoupon.id
    this.dataService.updateCoupon(updateCoupon);
    setTimeout(() => {
      this.clearSelection(), this.adminFetchDetails()
    }, 50);
  }

  adminRemoveCoupon() {
    this.dataService.deleteCoupon(this.currentCoupon.id);
    setTimeout(() => {
      this.clearSelection(), this.adminFetchDetails()
    }, 50);
  }

  editCurrentCoupon() {
    this.dataService.editCurrentCoupon(this.currentCoupon);
  }
  clearSelection() {
    this.selectedIndex = -1;
    this.currentCoupon = null;
    if (this.isAdmin()) {
      this.editCurrentCoupon();
    }
  }

  adminFetchDetails() {
    this.dataService.setAllCoupons();
    setTimeout(() => {
      this.marketArray = this.dataService.getAllCoupons();
    }, 100);
  }


}






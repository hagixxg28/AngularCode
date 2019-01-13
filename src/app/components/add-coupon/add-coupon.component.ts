import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/Coupon';
import { AllDataService } from 'src/app/services/all-data.service';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent implements OnInit {
w
  newCoupon: Coupon = new Coupon();
  now: string = new Date().toJSON().split('T')[0];
  constructor(private dataService: AllDataService) { }
  ngOnInit() {
  }

  addCoupon() {
    this.newCoupon.compId = this.dataService.userDetails.id
    this.newCoupon.startDate = new Date();
    console.log(this.newCoupon)
    this.dataService.addCoupon(this.newCoupon)
    this.newCoupon = new Coupon();
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Coupon } from 'src/app/models/Coupon';
import { AllDataService } from 'src/app/services/all-data.service';
import { DateCalculatorService } from 'src/app/services/date-calculator.service';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {


  constructor(private dataService: AllDataService, private dateCalc: DateCalculatorService) { }

  ngOnInit(): void {
    this.dataService.couponCaster.subscribe((coupon) => this.currentCoupon = coupon)
  }


  toggleTitle: boolean = false;
  toggleMessage: boolean = false;
  toggleDate: boolean = false;
  togglePrice: boolean = false;
  toggleAmount: boolean = false;
  toggleType: boolean = false;
  toggleImage: boolean = false;



  @Output()
  updateEmitter = new EventEmitter();
  now: string = new Date().toJSON().split('T')[0];
  currentCoupon: Coupon = new Coupon();
  updateCoupon: Coupon = new Coupon();


  emitUpdate() {
    this.updateEmitter.emit(this.updateCoupon)
    setTimeout(() => {
      this.clearFields()
    }, 25);
  }


  toggle(field) {
    switch (field) {
      case "title":
        this.toggleTitle = !this.toggleTitle;
        this.updateCoupon.title = undefined;
        break;

      case "message":
        this.toggleMessage = !this.toggleMessage;
        this.updateCoupon.message = undefined
        break;

      case "date":
        this.toggleDate = !this.toggleDate;
        this.updateCoupon.endDate = undefined
        break;

      case "price":
        this.togglePrice = !this.togglePrice;
        this.updateCoupon.price = undefined
        break;

      case "amount":
        this.toggleAmount = !this.toggleAmount;
        this.updateCoupon.amount = undefined
        break;

      case "type":
        this.toggleType = !this.toggleType;
        this.updateCoupon.type = undefined
        break;

      case "image":
        this.toggleImage = !this.toggleImage;
        this.updateCoupon.image = undefined
        break;
    }

  }

  clearFields() {
    this.toggleTitle = false;
    this.toggleMessage = false;
    this.toggleDate = false;
    this.togglePrice = false;
    this.toggleAmount = false;
    this.toggleType = false;
    this.toggleImage = false;
    this.updateCoupon = new Coupon()
  }


}

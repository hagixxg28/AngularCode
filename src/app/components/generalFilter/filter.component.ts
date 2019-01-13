import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Coupon } from 'src/app/models/Coupon';
import { UserDetails } from 'src/app/models/UserDetails';
import { AllDataService } from 'src/app/services/all-data.service';

@Component({
  selector: 'app-filter-general',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class GeneralFilterComponent {

  constructor(private dataService: AllDataService) { }

  ngOnInit() {
    this.marketArray = this.dataService.getAllCoupons();
  }
  public marketArray: Coupon[];
  public isCustomerCheck
  public searchArray: Coupon[];
  @Output() public ChildEvent = new EventEmitter;


  public priceFilterValue: number;
  public currentFilterOption: string = "none";
  public currentTypeOption: string;
  public dateFilterValue: Date
  public idFilterValue: string;


  filterByPrice() {
    this.dataService.setArrayByPrice(this.priceFilterValue);
    setTimeout(() => {
      this.ChildEvent.emit();
    }, 25);
  }

  filterByType(value: string) {
    this.setTypeOption(value);
    this.dataService.setArrayByType(this.currentTypeOption);
    setTimeout(() => {
      this.ChildEvent.emit();
    }, 25);
  }

  filterByDate() {
    this.dataService.setArrayByDate(this.dateFilterValue);
    setTimeout(() => {
      this.ChildEvent.emit();
    }, 25);
  }

  filterById() {
    let isId = false;
    let id
    if (this.currentFilterOption == "id") {
      isId = true;
    }
    //If the user entered value is null, we will set the array back to it's default state
    if (this.idFilterValue == null) {
      this.resetArray();
      this.ChildEvent.emit(this.marketArray);
      return;
    }
    //Turning all the variables into string in order to use the method 'includes()'
    let value = this.idFilterValue.toString();
    this.searchArray = [];
    if (this.marketArray == undefined) {
      this.resetArray();
      this.ChildEvent.emit(this.marketArray);
      return;
    }
    this.marketArray.forEach(coupon => {
      if (isId) {
        id = coupon.id.toString();
      } else {
        id = coupon.compId.toString();
      }
      //Determining the length of the values, in order to use the include method properly (You can't contain something that is bigger than you)
      if (id.length >= value.length) {
        if (id.includes(value)) {
          if (!this.searchArray.includes(coupon)) {
            this.searchArray.push(coupon)
          }
        }
      }
      if (id.length <= value.length) {
        if (value.includes(id)) {
          if (!this.searchArray.includes(coupon)) {
            this.searchArray.push(coupon)
          }
        }
      }
    });
    //Checking if something has been added to the array, we don't want to show the user an empty array
    if (!(this.searchArray == undefined || this.searchArray.length == 0)) {
      this.dataService.setArray(this.searchArray);
      this.ChildEvent.emit();
    }
  }



  setTypeOption(value: string) {
    this.currentTypeOption = value;
  }

  setOption(value) {
    this.currentFilterOption = value;
    if (value == "none") {
      this.resetArray()
    }
  }

  resetArray() {
    this.marketArray = this.dataService.AllCoupons;
    this.dataService.setArrayToAllCoupons()
    this.ChildEvent.emit()
  }
}

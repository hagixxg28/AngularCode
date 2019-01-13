import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AllDataService } from 'src/app/services/all-data.service';
import { Coupon } from 'src/app/models/Coupon';

@Component({
  selector: 'app-company-filter',
  templateUrl: './company-filter.component.html',
  styleUrls: ['./company-filter.component.css']
})
export class CompanyFilterComponent implements OnInit {

  constructor(private dataService: AllDataService) { }

  ngOnInit() {
    this.dataService.setArrayForCompany();
    this.marketArray = this.dataService.getArray();
  }
  public marketArray: Coupon[];
  public searchArray: Coupon[];
  @Output() public ChildEvent = new EventEmitter;


  public priceFilterValue: number;
  public currentFilterOption: string = "none";
  public currentTypeOption: string;
  public dateFilterValue: Date
  public idFilterValue: string;


  filterByPrice() {
    this.dataService.setArrayForCompanyByPrice(this.priceFilterValue);
    setTimeout(() => {
      this.ChildEvent.emit();
    }, 25);
  }

  filterByType(value: string) {
    this.setTypeOption(value);
    this.dataService.setArrayForCompanyByType(this.currentTypeOption);
    setTimeout(() => {
      this.ChildEvent.emit();
    }, 25);
  }

  filterByDate() {
    this.dataService.setArrayForCompanyByDate(this.dateFilterValue);
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
      setTimeout(() => {
        return;
      }, 50)
    }
    if (this.marketArray == undefined) {
      this.resetArray();
      setTimeout(() => {
        return;
      }, 50)
    }
    //Turning all the variables into string in order to use the method 'includes()'
    if (this.idFilterValue != null && this.marketArray != undefined) {
      let value = this.idFilterValue.toString();
      this.searchArray = [];
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
    this.dataService.setArrayForCompany()
    setTimeout(() => {
      this.marketArray = this.dataService.getArray(), this.ChildEvent.emit()
    }, 100);
  }

}

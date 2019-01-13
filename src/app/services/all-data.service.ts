import { Injectable, OnInit } from '@angular/core';
import { Coupon } from '../models/Coupon';
import { Company } from '../models/Company';
import { Customer } from '../models/Customer';
import { UserDetails } from '../models/UserDetails';
import { CouponService } from './coupon.service';
import { CustomerService } from './customer.service';
import { CompanyService } from './company.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllDataService {

  public companyView: boolean = false;

  toggleView() {
    if (this.companyView) {
      this.companyView = false;
    } else {
      this.companyView = true;
    }
  }

  getToggleView() {
    return this.companyView;
  }

  public userLoggedIn: boolean = false;

  public AllCoupons: Coupon[];
  public ChangingCouponArray: Coupon[];

  public AllCustomers: Customer[];

  public AllCompanies: Company[];

  public userDetails: UserDetails = new UserDetails()

  public currentCompany: Company

  public currentCustomer: Customer


  private currentcompanySubject = new BehaviorSubject<Company>(new Company());

  companyCaster = this.currentcompanySubject.asObservable();

  editCurrentCompany(newCompany) {
    this.currentcompanySubject.next(newCompany);
    this.currentcustomerSubject.next(new Customer());

  }

  private currentcustomerSubject = new BehaviorSubject<Customer>(new Customer());

  customerCaster = this.currentcustomerSubject.asObservable();


  editCurrentCustomer(newCustomer) {
    this.currentcustomerSubject.next(newCustomer);
    this.currentcompanySubject.next(new Company());

  }

  private currentCoupon = new BehaviorSubject<Coupon>(new Coupon());

  couponCaster = this.currentCoupon.asObservable();

  editCurrentCoupon(newCoupon) {
    this.currentCoupon.next(newCoupon);
  }

  constructor(private couponService: CouponService, private customerService: CustomerService, private companyService: CompanyService) { }
  //General User:
  toggleLogin() {
    this.userLoggedIn = !this.userLoggedIn;
  }

  isLoggedIn() {
    return this.userLoggedIn;
  }


  //General Coupons
  setAllCoupons() {
    let Ob = this.couponService.getAllCoupons();
    Ob.subscribe(coupons => {
      this.AllCoupons = coupons
    })
  }

  setArrayByType(value: string) {
    let Ob = this.couponService.getCouponsByType(value);
    Ob.subscribe(coupons => {
      this.ChangingCouponArray = coupons
    })
  }

  setArrayByPrice(value: number) {
    let Ob = this.couponService.getCouponsByPrice(value)
    Ob.subscribe(coupons => {
      setTimeout(() => {
        this.couponSubscriber(coupons)
      }, 0);

    })
  }


  setArrayByDate(value: Date) {
    const Ob = this.couponService.getCouponsByDate(value);
    Ob.subscribe(coupons => {
      this.couponSubscriber(coupons)
    })
  }



  setArrayToAllCoupons() {
    this.ChangingCouponArray = this.AllCoupons;
  }

  setArray(MyArray: Coupon[]) {
    this.ChangingCouponArray = MyArray;
  }
  //------

  //Coupon Update Delete:
  updateCoupon(coupon: Coupon) {
    const Ob = this.couponService.updateCoupon(coupon);
    Ob.subscribe(()=>alert("Updated details"));
  }
  deleteCoupon(couponid: number) {
    
    const Ob = this.couponService.deleteCoupon(couponid);
    Ob.subscribe()
  }

  addCoupon(coupon: Coupon) {
    const Ob = this.couponService.addCoupon(coupon);
    Ob.subscribe(()=>alert("Coupon has been added"))
  }


  //------
  //Customer:


  setAllCustomers() {
    let Ob = this.customerService.getAllCustomers()
    Ob.subscribe(customers => this.AllCustomers = customers)
  }

  updateCustomer(customer: Customer) {
    let Ob = this.customerService.updateCustomer(customer)
    Ob.subscribe(() => alert("Updated details"))
  }


  deleteCustomer(custId: number) {
    let Ob = this.customerService.removeCustomer(custId)
    Ob.subscribe()
  }

  createCustomer(customer: Customer) {
    let Ob = this.customerService.createCustomer(customer)
    Ob.subscribe(() => alert("Customer created"));
  }


  setArrayForCustomer() {
    if (!this.currentCustomer) {
      this.customerCaster.subscribe((customer) => this.currentCustomer = customer)
    }
    setTimeout(() => {
      const Ob = this.couponService.getCouponsForCustomer(this.currentCustomer.id);
      Ob.subscribe(coupons => {
        this.couponSubscriber(coupons)
      })
    }, 25);

  }

  setArrayForCustomerByDate(value: Date) {
    let Ob = this.couponService.getCouponsForCustomerByDate(this.currentCustomer.id, value);
    Ob.subscribe(coupons => {
      this.couponSubscriber(coupons)
    })
  }
  setArrayForCustomerByType(value: string) {
    let Ob = this.couponService.getCouponsForCustomerByType(this.currentCustomer.id, value);
    Ob.subscribe(coupons => {
      this.couponSubscriber(coupons)
    })
  }
  setArrayForCustomerByPrice(value: number) {
    let Ob = this.couponService.getCouponsForCustomerByPrice(this.currentCustomer.id, value);
    Ob.subscribe(coupons => {
      this.couponSubscriber(coupons)
    })
  }


  purchaseCoupon(coupId: number) {
    let Ob = this.couponService.purchaseCouopn(this.currentCustomer.id, coupId)
    Ob.subscribe()
  }
  //-----
  //Company:

  setAllCompanies() {
    let Ob = this.companyService.getAllCompanies()
    Ob.subscribe((companies) => this.AllCompanies = companies)
  }



  updateCompany(company: Company) {
    let Ob = this.companyService.updateCompany(company)
    Ob.subscribe(()=>alert("Updated details"))
  }


  deleteCompany(compId: number) {
    let Ob = this.companyService.removeCompany(compId)
    Ob.subscribe()
  }

  createCompany(company: Company) {
    let Ob = this.companyService.createCompany(company)
    Ob.subscribe(() => alert("Company created"))
  }



  setArrayForCompany() {
    if (!this.currentCompany) {
      this.companyCaster.subscribe((company) => this.currentCompany = company)
    }
    setTimeout(() => {
      let Ob = this.couponService.getCouponsForCompany(this.currentCompany.id);
      Ob.subscribe(coupons => {
        this.couponSubscriber(coupons)
      })
    }, 25);

  }

  setArrayForCompanyByDate(value: Date) {
    if (!this.currentCompany) {
      this.companyCaster.subscribe((company) => this.currentCompany = company)
    }
    setTimeout(() => {
      let Ob = this.couponService.getCouponsForCompanyByDate(this.currentCompany.id, value);
      Ob.subscribe(coupons => {
        this.couponSubscriber(coupons)
      })
    }, 25);

  }

  setArrayForCompanyByType(value: string) {
    let Ob = this.couponService.getCouponsForCompanyByType(this.currentCompany.id, value);
    Ob.subscribe(coupons => {
      this.couponSubscriber(coupons)
    })
  }


  setArrayForCompanyByPrice(value: number) {
    let Ob = this.couponService.getCouponsForCompanyByPrice(this.currentCompany.id, value);
    Ob.subscribe(coupons => {
      this.couponSubscriber(coupons)
    })
  }

  //---------------



  //Etc:
  couponSubscriber(coupons: Coupon[]) {
    this.ChangingCouponArray = coupons;
  }

  getAllCoupons() {
    return this.AllCoupons;
  }

  getArray() {
    return this.ChangingCouponArray;
  }



  setUserDetails(newDetails: UserDetails) {
    this.userDetails.id = newDetails.id
    this.userDetails.email = newDetails.email
    this.userDetails.type = newDetails.type

  }

  clearUserDetails() {
    this.userDetails = new UserDetails(undefined, undefined, undefined, undefined, undefined)
  }
  //-----
}




import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coupon } from '../models/Coupon';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private http: HttpClient) { }

  Url = "http://localhost:8080/CouponFixAttempt/rest/Coupon/"
  //---------------
  //Udate Delete
  public updateCoupon(coupon: Coupon) {
    return this.http.put(this.Url, coupon)
  }
  public deleteCoupon(couponId: number) {
    return this.http.delete(this.Url + couponId)
  }

  public addCoupon(coupon: Coupon) {
    return this.http.post(this.Url, coupon);
  }

  //-----------
  //General coupons
  public getAllCoupons(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.Url);
  }

  public getCoupon(couponId: number): Observable<Coupon> {
    return this.http.get<Coupon>(this.Url + couponId);
  }

  public getCouponsByPrice(price: number): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.Url + "price?price=" + price);
  }

  public getCouponsByDate(date: Date): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.Url + "date?date=" + date);
  }

  public getCouponsByType(type: string): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.Url + "type?type=" + type);
  }
  //----------------------
  //Company section
  public getCouponsForCompany(compId: number): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.Url + "company/" + compId);
  }

  public getCouponsForCompanyByType(compId: number, type: string): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.Url + "company/" + compId + "/type?type=" + type);
  }

  public getCouponsForCompanyByDate(compId: number, date: Date): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.Url + "company/" + compId + "/date?date=" + date);
  }

  public getCouponsForCompanyByPrice(compId: number, price: number): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.Url + "company/" + compId + "/price?price=" + price);
  }
  //--------------------------
  //Customer section
  public getCouponsForCustomer(custId: number): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.Url + "customer/" + custId);
  }

  public getCouponsForCustomerByType(custId: number, type: string): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.Url + "customer/" + custId + "/type?type=" + type);
  }

  public getCouponsForCustomerByDate(custId: number, date: Date): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.Url + "customer/" + custId + "/date?date=" + date);
  }

  public getCouponsForCustomerByPrice(custId: number, price: number): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.Url + "customer/" + custId + "/price?price=" + price);
  }

  public purchaseCouopn(custId: number, coupId: number) {
    return this.http.get(this.Url + "purchase/" + coupId + "/" + custId)
  }
  //----------------


}

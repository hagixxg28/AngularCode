import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/Customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }


  Url = "http://localhost:8080/CouponFixAttempt/rest/Customer/"
  //---------------
  //General coupons
  public getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.Url);
  }
  public getCustomer(customerId: number): Observable<Customer> {
    return this.http.get<Customer>(this.Url + customerId);
  }

  public createCustomer(customer: Customer) {
    return this.http.post(this.Url, customer)
  }

  public updateCustomer(customer: Customer) {
    return this.http.put(this.Url, customer)
  }

  public removeCustomer(customerId: number) {
    return this.http.delete(this.Url + customerId)
  }

}

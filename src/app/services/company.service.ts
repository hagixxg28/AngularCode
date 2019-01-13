import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/Company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }


  Url = "http://localhost:8080/CouponFixAttempt/rest/Company/"
  //---------------
  //General coupons
  public getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.Url);
  }
  public getCompany(companyId: number): Observable<Company> {
    return this.http.get<Company>(this.Url + companyId);
  }

  public createCompany(compnay: Company) {
    
    return this.http.post(this.Url, compnay)
  }

  public updateCompany(compnay: Company) {
    return this.http.put(this.Url, compnay)
  }

  public removeCompany(companyId: number) {
    return this.http.delete(this.Url + companyId)
  }
}

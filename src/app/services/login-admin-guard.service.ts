import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AllDataService } from './all-data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginAdminGuardService {

  constructor(private router: Router, private dataService: AllDataService) { }

  public canActivate(): boolean {

    const isLoggedIn = sessionStorage.getItem("isLoggedIn");

    if (isLoggedIn && this.dataService.userDetails.type == "ADMIN") {
      return true;
    }

    this.router.navigate(["/Home"]);

    return false;
  }
}

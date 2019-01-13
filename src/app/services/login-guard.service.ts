import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {

  constructor(private router: Router) { }

  public canActivate(): boolean {

      const isLoggedIn = sessionStorage.getItem("isLoggedIn");

      if(isLoggedIn) {
          return true;
      }

      this.router.navigate(["/Home"]);

      return false;
  }
}

import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AllDataService } from 'src/app/services/all-data.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private dataService: AllDataService) { }



  isLoggedIn() {
    return this.dataService.isLoggedIn()
  }
  public logout(): void {


    this.dataService.toggleLogin();

    this.dataService.clearUserDetails();

    sessionStorage.removeItem("isLoggedIn");

    this.router.navigate(["/Home"]);




  };
}

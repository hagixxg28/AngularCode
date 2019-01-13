import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllDataService } from 'src/app/services/all-data.service';

// ng g c components/Menu -m modules/App --spec false

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent {

    constructor(private router: Router, private dataService: AllDataService) { }

    isLoggedIn(){
        return this.dataService.isLoggedIn()
    }
    public logout(): void {


        this.dataService.toggleLogin();

        this.dataService.clearUserDetails();

        sessionStorage.removeItem("isLoggedIn");

        this.router.navigate(["/Home"]);




    };

}

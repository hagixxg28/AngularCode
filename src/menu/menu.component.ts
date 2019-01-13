import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// ng g c components/Menu -m modules/App --spec false

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent {

    constructor(private router: Router) { }

    public logout(): void {
        sessionStorage.removeItem("isLoggedIn");
        this.router.navigate(["/home"]);
    }

}

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AllDataService } from 'src/app/services/all-data.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {


  loginBoolean: boolean;

  constructor(private titleService: Title, private dataService: AllDataService) { }

  ngOnInit() {
    this.loginBoolean = this.dataService.userLoggedIn;
    this.titleService.setTitle('Welcome To Coupons!');
  }
  setBoolean(){
    this.loginBoolean=this.dataService.userLoggedIn;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateCalculatorService {

  constructor() { }


  calculateDays(date1: Date, date2: Date) {
    let difference = date1.getMilliseconds() - date2.getMilliseconds();

    let days = Math.round(Math.abs(difference / 1000 * 60 * 60 * 24));

    return days;
  }
}

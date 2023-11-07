import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  mySelect = 'Select One';
  mySelect1='Select One';
  selectedValue: any;
  constructor( private _Router: Router) { }

  ngOnInit(): void {
  }
  selectChange() {
    var e1 = (<HTMLInputElement>document.getElementById("Drop_location")).value;
    this._Router.navigateByUrl('/booking/seatselection');
}
}

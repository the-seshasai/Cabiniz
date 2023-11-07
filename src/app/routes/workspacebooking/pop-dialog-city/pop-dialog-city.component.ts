import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pop-dialog-city',
  templateUrl: './pop-dialog-city.component.html',
  styleUrls: ['./pop-dialog-city.component.scss']
})
export class PopDialogCityComponent implements OnInit {

  selected=0;
    City_List = ['Chennai', 'Bangalore','kolkata'];
    constructor(private matDialog: MatDialogRef<PopDialogCityComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _Router:Router,
      private dialog: MatDialog,) {

      
       }
    ngOnInit(): void {
    }
    Post_City() {
      // var e1 = (<HTMLInputElement>document.getElementById("Drop_city")).value;
      this._Router.navigateByUrl('/booking/seatselection');
  }
  showPage(getCity)
  {
    // this._Router.navigateByUrl('/booking/seatselection');
    localStorage.setItem('getCity', getCity);
    this.matDialog.close();
  }


  }
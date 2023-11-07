import {Component} from '@angular/core';

import { DashboardService } from './dashboard.srevice';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService],
})
export class DashboardComponent  {
 
TotalBooking:any=0;
TotalUser:any=0;
TotalAlerts:any=0;
TotalApproved:any=0;
TotalReject:any=0;
TotalPending:any=0;
 

  constructor(
   private Dashboard_service:DashboardService
  ) {}

  ngOnInit() {
  

     this.Dashboard_service.Get_Booking().subscribe(res => {
      this.TotalBooking=res;
      console.log(this.TotalBooking);
     });

     this.Dashboard_service.Get_Alerts().subscribe(res => {
      this.TotalAlerts=res;
     });

     this.Dashboard_service.Get_Approved().subscribe(res => {
      this.TotalApproved=res;
     });

     this.Dashboard_service.Get_Reject().subscribe(res => {
      this.TotalReject=res;
     });

     this.Dashboard_service.Get_Pending().subscribe(res => {
      this.TotalPending=res;
     });


     this.Dashboard_service.Get_Userlist().subscribe(res => {
      this.TotalUser=res;
    
     });

  }

 
}

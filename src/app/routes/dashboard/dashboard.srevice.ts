import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment.prod';



@Injectable()
export class DashboardService {

  constructor(private http: HttpClient) {}


  Get_Booking()
  {
    return this.http.get(environment.serverUrl + 'Home/TodaysBooking');
  }
  Get_Alerts()
  {
    return this.http.get(environment.serverUrl + '');
  }
  Get_Approved()
  {
    return this.http.get(environment.serverUrl + 'Home/TodaysApprove');
  }
  Get_Reject()
  {
    return this.http.get(environment.serverUrl + 'Home/TodaysReject');
  }
  Get_Pending()
  {
    return this.http.get(environment.serverUrl + 'Home/TodaysPending');
  }

  Get_Userlist()
  {
    return this.http.get(environment.serverUrl + 'Home/TotalEmployee');
  }

}

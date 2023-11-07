import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApproverDashboardComponent } from './approver-dashboard.component';
import { ApproverStatusComponent } from './approver-status.component';
import { AttendanceComponent } from './attendance.component';
import { CityComponent } from './city.component';
import { LocationComponent } from './location.component';
import { SeatselectionComponent } from './seatselection.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Booking'
    },
    children: [
      {
        path: '',
        redirectTo: 'city'
      },
      {
        path: 'city',
        component: CityComponent,
        data: {
          title: 'city'
        }
      },
      {
        path: 'location',
        component: LocationComponent,
        data: {
          title: 'location'
        }
      },
      {
        path: 'seatselection',
        component: SeatselectionComponent,
        data: {
          title: 'seat selection'
        }
      },
      {
        path: 'approver-dashboard',
        component: ApproverDashboardComponent,
        data: {
          title: 'Approver List'
        }
      },
      {
        path: 'approver-status',
        component: ApproverStatusComponent,
        data: {
          title: 'Approver Status'
        }
      },
      {
        path: 'attendance',
        component: AttendanceComponent,
        data: {
          title: 'Attendance'
        }
      },
      
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule {}

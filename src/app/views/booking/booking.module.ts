import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityComponent } from './city.component';
import { BookingRoutingModule } from './booking-routing.module';
import { LocationComponent } from './location.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeatselectionComponent } from './seatselection.component';
import { DemoMaterialModule } from '../../material-module';
import { ApproverDashboardComponent } from './approver-dashboard.component';
import { ApproverStatusComponent } from './approver-status.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AttendanceComponent } from './attendance.component';

@NgModule({
  declarations: [CityComponent, LocationComponent, 
    SeatselectionComponent, 
    ApproverDashboardComponent,
     ApproverStatusComponent,
     AttendanceComponent,

     ],
  entryComponents: [ApproverStatusComponent],
  imports: [
    CommonModule,
    BookingRoutingModule,
    FormsModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxMaterialTimepickerModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      
    })
    // FormGroup,
    // FormControl
  ]
 
})
export class BookingModule { }

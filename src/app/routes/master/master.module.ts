import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CompanyComponent } from './company/company.component';
import { MasterRoutingModule } from './master-routing.module';
import { CompanyLocationlistComponent } from './company-locationlist/company-locationlist.component';
import { AddCompanyLocationComponent } from './add-company-location/add-company-location.component';
import { FloorMasterListComponent } from './floor-master-list/floor-master-list.component';
import { AddFloorMasterComponent } from './add-floor-master/add-floor-master.component';
import { CubicleMasterListComponent } from './cubicle-master-list/cubicle-master-list.component';
import { AddCubicleMasterComponent } from './add-cubicle-master/add-cubicle-master.component';
import { MeetingRoomMasterlistComponent } from './meeting-room-masterlist/meeting-room-masterlist.component';
import { AddMeetingRoomMasterComponent } from './add-meeting-room-master/add-meeting-room-master.component';
import { SeatmanagementComponent } from './seatmanagement/seatmanagement.component';
import { AddseatsComponent } from './seatmanagement/addseats/addseats.component';



const COMPONENTS = [];
const COMPONENTS_DYNAMIC = [];


@NgModule({
  imports: [SharedModule,MasterRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC,CompanyComponent, 
    CompanyLocationlistComponent,
     AddCompanyLocationComponent, 
     FloorMasterListComponent, 
     AddFloorMasterComponent, 
     CubicleMasterListComponent, 
     AddCubicleMasterComponent, 
     MeetingRoomMasterlistComponent, 
     AddMeetingRoomMasterComponent, SeatmanagementComponent, AddseatsComponent],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class MasterModule { }

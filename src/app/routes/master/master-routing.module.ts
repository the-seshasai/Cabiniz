import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCompanyLocationComponent } from './add-company-location/add-company-location.component';
import { AddCubicleMasterComponent } from './add-cubicle-master/add-cubicle-master.component';
import { AddFloorMasterComponent } from './add-floor-master/add-floor-master.component';
import { AddMeetingRoomMasterComponent } from './add-meeting-room-master/add-meeting-room-master.component';
import { CompanyLocationlistComponent } from './company-locationlist/company-locationlist.component';
import { CompanyComponent } from './company/company.component';
import { CubicleMasterListComponent } from './cubicle-master-list/cubicle-master-list.component';
import { FloorMasterListComponent } from './floor-master-list/floor-master-list.component';
import { MeetingRoomMasterlistComponent } from './meeting-room-masterlist/meeting-room-masterlist.component';
import { CategoryMasterComponent } from '../category-master/category-master.component';
import { AddCategoryComponent } from '../category-master/add-category/add-category.component';
import { SeatmanagementComponent } from './seatmanagement/seatmanagement.component';
import { AddseatsComponent } from './seatmanagement/addseats/addseats.component';

// import { AddRoleComponent } from './add-role/add-role.component';


const routes: Routes = [
  
   { path: 'company', component: CompanyComponent, data: { title: 'Material Colors' } },
   { path: 'companylocationlist', component: CompanyLocationlistComponent, data: { title: 'Material Colors' } },
   { path: 'category-master', component: CategoryMasterComponent, data: { title: 'category-master' } },
   { path: 'addcategory/:CategoryUId', component: AddCategoryComponent, data: { title: 'Material Colors' } },
   { path: 'addcompanylocation', component: AddCompanyLocationComponent, data: { title: 'Material Colors' } },
   { path: 'floormasterlist', component: FloorMasterListComponent, data: { title: 'Material Colors' } },
   { path: 'addfloormaster/:Floorid', component: AddFloorMasterComponent, data: { title: 'Material Colors' } },
   { path: 'seatmanagement', component: SeatmanagementComponent, data: { title: 'Material Colors' } },
   { path: 'addseats/:SeatUId', component: AddseatsComponent, data: { title: 'Material Colors' } },
   { path: 'cubiclemasterlist', component: CubicleMasterListComponent, data: { title: 'Material Colors' } },
   { path: 'addcubiclemaster/:Cmid', component: AddCubicleMasterComponent, data: { title: 'Material Colors' } },
   { path: 'meetingroommasterlist', component: MeetingRoomMasterlistComponent, data: { title: 'Material Colors' } },
   { path: 'addmeetingroommaster/:Mrmid', component: AddMeetingRoomMasterComponent, data: { title: 'Material Colors' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterRoutingModule {}

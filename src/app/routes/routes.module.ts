import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RoutesRoutingModule } from './routes-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './sessions/login/login.component';
import { RegisterComponent } from './sessions/register/register.component';
import { BookingComponent } from './booking/booking.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { ApprovalComponent } from './approval/approval.component';
// import { CompanyComponent } from './master/company/company.component';
import { SeatselectionComponent } from './seatselection/seatselection.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { ApproverStatusComponent } from './approver-status/approver-status.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { PopViewMapComponent } from './pop-view-map/pop-view-map.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RoleComponent } from './role/role.component';
import { CategoryMasterComponent } from './category-master/category-master.component';
import { AddCategoryComponent } from './category-master/add-category/add-category.component';





const COMPONENTS = [DashboardComponent, LoginComponent, RegisterComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, RoutesRoutingModule,FlexLayoutModule
   ],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, BookingComponent, RoleComponent,
    AttendanceComponent, ApprovalComponent,
     SeatselectionComponent,AddCompanyComponent, ApproverStatusComponent,
      UsersComponent, AddUserComponent, PopViewMapComponent, CategoryMasterComponent, AddCategoryComponent],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class RoutesModule {}

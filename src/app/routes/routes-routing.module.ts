import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';

import { AdminLayoutComponent } from '../theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '../theme/auth-layout/auth-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './sessions/login/login.component';
import { RegisterComponent } from './sessions/register/register.component';
import { AuthGuard } from '@core';
import { BookingComponent } from './booking/booking.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { ApprovalComponent } from './approval/approval.component';
import { SeatselectionComponent } from './seatselection/seatselection.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ForgotComponent } from './sessions/forgot/forgot.component';

import { RoleComponent } from './role/role.component';
import { SignInComponent } from './sessions/sign-in/sign-in.component';



const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard', titleI18n: 'dashboard' },
      },
      {
        path: 'booking',
        component: BookingComponent,
        data: { title: 'booking', titleI18n: 'dashboard' },
      },
      {
        path: 'users',
        component: UsersComponent,
        data: { title: 'users', titleI18n: 'user' },
      },
      {
        path: 'role',
        component: RoleComponent,
        data: { title: 'add-role', titleI18n: 'role' },
      },
      {
        path: 'attendance',
        component: AttendanceComponent,
        data: { title: 'attendance', titleI18n: 'dashboard' },
      },
      {
        path: 'approval',
        component: ApprovalComponent,
        data: { title: 'approval', titleI18n: 'dashboard' },
      },
    
      {
        path: 'seatselection',
        component: SeatselectionComponent,
        data: { title: 'seatselection', titleI18n: 'dashboard' },
      },

      {
        path: 'add-company/:Compid',
        component: AddCompanyComponent,
        data: { title: 'add-company', titleI18n: 'dashboard' },
      },

      {
        path: 'add-user/:userid',
        component: AddUserComponent,
        data: { title: 'add-user', titleI18n: 'user' },
      },


      {
        path: 'workspacebooking',
        loadChildren: () => import('./workspacebooking/workspacebooking.module').then(m => m.WorkspaceBookingModule),
        data: { title: 'Booking', titleI18n: 'Booking' },
      },

    
      {
        path: 'master',
        loadChildren: () => import('./master/master.module').then(m => m.MasterModule),
        data: { title: 'master', titleI18n: 'Booking' },
      },


      {
        path: 'modules',
        loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule),
        data: { title: 'modules', titleI18n: 'Booking' },
      },

    













      {
        path: 'design',
        loadChildren: () => import('./design/design.module').then(m => m.DesignModule),
        data: { title: 'Design', titleI18n: 'design' },
      },
      {
        path: 'material',
        loadChildren: () => import('./material/material.module').then(m => m.MaterialModule),
        data: { title: 'Material', titleI18n: 'material' },
      },
      {
        path: 'media',
        loadChildren: () => import('./media/media.module').then(m => m.MediaModule),
        data: { title: 'Media', titleI18n: 'media' },
      },
      {
        path: 'forms',
        loadChildren: () => import('./forms/forms.module').then(m => m.FormsModule),
        data: { title: 'Forms', titleI18n: 'forms' },
      },
      {
        path: 'tables',
        loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule),
        data: { title: 'Tables', titleI18n: 'tables' },
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
        data: { title: 'Profile', titleI18n: 'profile' },
      },
      {
        path: 'sessions',
        loadChildren: () => import('./sessions/sessions.module').then(m => m.SessionsModule),
        data: { title: 'Sessions', titleI18n: 'sessions' },
      },
      {
        path: 'helpers',
        loadChildren: () => import('./helpers/helpers.module').then(m => m.HelpersModule),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, data: { title: 'Login', titleI18n: 'login' } },
      { path: 'forgot', component: ForgotComponent, data: { title: 'Login', titleI18n: 'login' } },
   
      {
        path: 'sign-in',
        component: SignInComponent,
        data: { title: 'sign-in', titleI18n: 'sign-in' },
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
    }),
  ],
  exports: [RouterModule],
})
export class RoutesRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';





const routes: Routes = [
  {
    path: 'landingpage',
    component: LandingpageComponent,
    data: { title: 'landingpage', titleI18n: '500 Error' },
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class workspaceBookingRoutingModule {}

import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PopDialogCityComponent } from './pop-dialog-city/pop-dialog-city.component';
import { workspaceBookingRoutingModule } from './workspacebooking-routing.module';
import { LandingpageComponent } from './landingpage/landingpage.component';



const COMPONENTS = [];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, workspaceBookingRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, PopDialogCityComponent, LandingpageComponent],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class WorkspaceBookingModule { }

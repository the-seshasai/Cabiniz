import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DesignRoutingModule } from './design-routing.module';

import { DesignColorsComponent } from './colors/colors.component';
import { DesignIconsComponent } from './icons/icons.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FormsModule } from '../forms/forms.module';
import { ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [DesignColorsComponent, DesignIconsComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, DesignRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      
    })],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class DesignModule {}

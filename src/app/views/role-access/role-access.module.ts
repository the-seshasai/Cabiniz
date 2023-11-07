import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../../material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ModuleListComponent } from './module-list/module-list.component';
import { AddRoleComponent } from './add-role/add-role.component';
 import { AddModuleComponent } from './add-module/add-module.component';
import { RoleAccessRoutingModule } from './roleaccess-routing.module';
import { PopModelDeleteComponent } from '../company/pop-model-delete/pop-model-delete.component';


@NgModule({
  declarations: [
     ModuleListComponent,
     AddRoleComponent,
     AddModuleComponent,
     PopModelDeleteComponent
     ],
  entryComponents: [PopModelDeleteComponent,AddModuleComponent],
  imports: [
    CommonModule,
    RoleAccessRoutingModule,
    FormsModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxMaterialTimepickerModule,

  ]
 
})
export class RoleAccessModule { }

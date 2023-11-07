import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ModulesRoutingModule } from './modules-routing.module';
import { ModuleListComponent } from './module-list/module-list.component';
// import { AddRoleComponent } from './add-role/add-role.component';
import { AddModuleComponent } from './add-module/add-module.component';
import { PopModelDeleteComponent } from './pop-model-delete/pop-model-delete.component';


const COMPONENTS = [];
const COMPONENTS_DYNAMIC = [];


@NgModule({
  imports: [SharedModule,ModulesRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, ModuleListComponent, AddModuleComponent, PopModelDeleteComponent],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class ModulesModule { }

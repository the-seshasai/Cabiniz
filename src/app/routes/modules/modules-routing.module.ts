import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AddRoleComponent } from './add-role/add-role.component';
import { ModuleListComponent } from './module-list/module-list.component';

const routes: Routes = [
   { path: 'modulelist', component: ModuleListComponent, data: { title: 'Material Colors' } },
  //  { path: 'addrole', component: AddRoleComponent, data: { title: 'Material Colors' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddModuleComponent } from './add-module/add-module.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { ModuleListComponent } from './module-list/module-list.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Role'
    },
    children: [
      {
        path: '',
        redirectTo: ''
      },
      {
        path: 'module-list',
        component: ModuleListComponent,
        data: {
          title: 'ModuleList'
        }
      },
      {
        path: 'add-role',
        component: AddRoleComponent,
        data: {
          title: 'Add Role'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleAccessRoutingModule {}

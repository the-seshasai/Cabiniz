import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCompanyComponent } from './add-company/add-company.component';
import { CompanyMasterComponent } from './company-master/company-master.component';




const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Company'
    },
    children: [
      {
        path: '',
        redirectTo: 'company-master'
      },
      {
        path: 'company-master',
        component: CompanyMasterComponent,
        data: {
          title: 'Company'
        }
      },
      {
        path: 'add-company/:CompId',
        component: AddCompanyComponent,
        data: {
          title: 'Add Company'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule {}

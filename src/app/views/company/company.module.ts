import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../../material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyMasterComponent } from './company-master/company-master.component';
import { AddCompanyComponent } from './add-company/add-company.component';


@NgModule({
  declarations: [
CompanyMasterComponent,
AddCompanyComponent,

     ],
  entryComponents: [],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    FormsModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxMaterialTimepickerModule,

  ]
 
})
export class CompanyModule { }

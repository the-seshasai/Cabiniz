import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AppDateAdapter, APP_DATE_FORMATS } from '@shared/date.adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { CompanyService } from 'app/views/company/company.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class AddUserComponent implements OnInit {

  emailPattern = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  CompanyId:number;
  selected1=0;
  EffectiveStatus_List = ['Active', 'In-Active'];
  curmonth = (new Date().getMonth());
  curyear=(new Date().getFullYear());
  curdate=(new Date().getDate());
  minDate = new Date(this.curyear, this.curmonth-3, this.curdate); 
  maxDate = new Date(this.curyear, this.curmonth, this.curdate+7);
  AddUserForm = this.fb.group({
    CompId: [],
    CompanyName: ['',Validators.required],
    Website: [],
    CompEmail: ['',[Validators.required, Validators.pattern(this.emailPattern)]],
    CompContactNo: ['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    CompContactPerson: [],
    CompEffDate: [],
    CompEffStat: [],
    CreatedOn: [],
    CreatedBy: [],
    ModifiedOn: [],
    ModifiedBy: [],
    ContEmpId: [],
    MaxCapSize: [],
  });
  
  constructor( private router:ActivatedRoute,
    private _Router: Router,
    private fb:FormBuilder,
    private toastr: ToastrService,
    private company_service:CompanyService,) 
     { 
      this.AddUserForm.get('CompEffDate').setValue(new Date());
      this.CompanyId=parseInt(this.router.snapshot.paramMap.get('userid'));
     }

  ngOnInit(){

    this.company_service.Get_CompanyByCode(this.CompanyId).subscribe(res => {
      console.log("fdfdsfdfdsfdf");
      console.log(res);
      this.AddUserForm.patchValue(res[0]);
    
       });
  }

  formHasError(controlName: string, errorName: string) {
    return this.AddUserForm.controls[controlName].hasError(errorName);

 }

 Post_Company()
 {
  debugger;
  if (this.CompanyId !== 0) {
    if (this.AddUserForm.valid) {
      this.AddUserForm.controls['ModifiedOn'].setValue(new Date());
      this.company_service.putCompany(this.AddUserForm.value).subscribe(res => {
        this.toastr.success('Company successfully updated');
        this._Router.navigateByUrl('company');
      });
    }
  } else if (this.CompanyId === 0) {
    debugger;
  this.AddUserForm.controls['CompId'].setValue(0);
  this.AddUserForm.controls['CreatedOn'].setValue(new Date());
    if (this.AddUserForm.valid) {
      this.company_service.postCompnay(this.AddUserForm.value).subscribe(res => {
        this.toastr.success('Company successfully Saved');
        this._Router.navigateByUrl('company');
        
      });
    }
  }
 }
}

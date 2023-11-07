import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  emailPattern = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  CompanyId:number;
  selected1=0;
  EffectiveStatus_List = ['Active', 'In-Active'];
  curmonth = (new Date().getMonth());
  curyear=(new Date().getFullYear());
  curdate=(new Date().getDate());
  minDate = new Date(this.curyear, this.curmonth-3, this.curdate); 
  maxDate = new Date(this.curyear, this.curmonth, this.curdate+7);
  AddcompanyForm = this.fb.group({
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
      this.AddcompanyForm.get('CompEffDate').setValue(new Date());
      this.CompanyId=parseInt(this.router.snapshot.paramMap.get('CompId'));
     }

  ngOnInit(){

    this.company_service.Get_CompanyByCode(this.CompanyId).subscribe(res => {
      console.log("fdfdsfdfdsfdf");
      console.log(res);
      this.AddcompanyForm.patchValue(res[0]);
    
       });
  }

  formHasError(controlName: string, errorName: string) {
    return this.AddcompanyForm.controls[controlName].hasError(errorName);

 }

 Post_Company()
 {
  debugger;
  if (this.CompanyId !== 0) {
    if (this.AddcompanyForm.valid) {
      this.AddcompanyForm.controls['ModifiedOn'].setValue(new Date());
      this.company_service.putCompany(this.AddcompanyForm.value).subscribe(res => {
        this.toastr.success('Company successfully updated');
        this._Router.navigateByUrl('company/company-master');
      });
    }
  } else if (this.CompanyId === 0) {
    debugger;
  this.AddcompanyForm.controls['CompId'].setValue(0);
  this.AddcompanyForm.controls['CreatedOn'].setValue(new Date());
    if (this.AddcompanyForm.valid) {
      this.company_service.postCompnay(this.AddcompanyForm.value).subscribe(res => {
        this.toastr.success('Company successfully Saved');
        this._Router.navigateByUrl('company/company-master');
        
      });
    }
  }
 }
}

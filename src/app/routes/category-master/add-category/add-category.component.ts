import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDateAdapter, APP_DATE_FORMATS } from '@shared/date.adapter';
import { Company_interface, RoleaccessService } from 'app/routes/modules/roleaccess.service';
import { CompanyService } from 'app/views/company/company.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../category.service';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class AddCategoryComponent implements OnInit {

  CategoryUId:any;
  selected1=0;

  AddCategoryForm = this.fb.group({
 
  CategoryId: [''],
  CategoryUId: [''],
  CategoryName: [''],
  CategoryCode: [''],
  PricePerDay:[''],
  PricePerMonth:[''],
  CateCreatedOn: [''],
  CateCreatedBy: [''],
  CateModifiedOn: [''],
  CateModifiedBy: [''],
  CateEffStat: [''],
  });

  EffectiveStatus_List = ['Active', 'In-Active'];
 
  curmonth = (new Date().getMonth());
  curyear=(new Date().getFullYear());
  curdate=(new Date().getDate());
  minDate = new Date(this.curyear, this.curmonth-3, this.curdate); 
  maxDate = new Date(this.curyear, this.curmonth, this.curdate+7);
  constructor(
    private router:ActivatedRoute,
    private _Router: Router,
    private fb:FormBuilder,
    private role_service:RoleaccessService,
    private toastr: ToastrService,
    private companyservice:CompanyService,
    private Categoryservice:CategoryService,
  ) {
   
      this.CategoryUId=this.router.snapshot.paramMap.get('CategoryUId');
   }

  ngOnInit(): void {

   
    this.AddCategoryForm.get('CateEffStat').setValue('Active');
   

    if(this.CategoryUId)
    {
      this.Categoryservice.Get_categorylistByid(this.CategoryUId).subscribe(res => {
        console.log(res);
        this.AddCategoryForm.patchValue(res[0]);
  
     
        
      })
    }
  }

 

  formHasError(controlName: string, errorName: string) {
    return this.AddCategoryForm.controls[controlName].hasError(errorName);
 }

 Post_Category()
  {
    debugger;
    if (this.CategoryUId !== '0') {
      if (this.AddCategoryForm.valid) {
        this.AddCategoryForm.get('CateCreatedOn').setValue(new Date());
        this.AddCategoryForm.get('CateCreatedBy').setValue(localStorage.getItem('username'));
        this.AddCategoryForm.get('CateModifiedOn').setValue(new Date());
        this.AddCategoryForm.get('CateModifiedBy').setValue(localStorage.getItem('username'));
        this.Categoryservice.putCategory(this.AddCategoryForm.value).subscribe(res => {
          this.toastr.success('updated successfully');
          this._Router.navigateByUrl('master/category-master');
        });
      }
    } else if (this.CategoryUId === '0') {
      
      if (this.AddCategoryForm.valid) {
        this.AddCategoryForm.get('CateCreatedOn').setValue(new Date());
        this.AddCategoryForm.get('CateCreatedBy').setValue(localStorage.getItem('username'));
        this.Categoryservice.postCategory(this.AddCategoryForm.value).subscribe(res => {
        if(res=="Saved Successfully")
        {
          this.toastr.success('saved successfully');
          this._Router.navigateByUrl('master/category-master');
        }
        else
        {
          this.toastr.info('Category name already exists');

          this.AddCategoryForm.get('CategoryName').setValue("");
        }
        });
      
    }
  }
  }

}

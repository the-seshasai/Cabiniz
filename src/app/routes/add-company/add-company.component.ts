import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../master/company/company.service';
import { AppDateAdapter, APP_DATE_FORMATS } from '@shared/date.adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { Post_Module, RoleaccessService } from '../modules/roleaccess.service';


@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class AddCompanyComponent implements OnInit {
showmodules_flag=0;
base64Image: any;
select:any;
capsize=1;
selectedFeatures: any = [];
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

    CompanyType:[''],
    CorporateId:[''],
    CompId: [''],
    CompanyName: ['',Validators.required],
    Website: [''],
    CompEmail: ['',[Validators.required, Validators.pattern(this.emailPattern)]],
    CompContactNo: ['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    CompContactPerson: [''],
    CompEffDate: [''],
    CompEffStat: [''],
    CreatedOn: [''],
    CreatedBy: [''],
    ModifiedOn: [''],
    ModifiedBy: [''],
    ContEmpId: [''],
    MaxCapSize: ['',[Validators.required,Validators.max(50), Validators.min(1)]],
    MenuAccessLst: this.fb.array([
      this.fb.group({
        MAId: [''],
        CompId: [''],
        RoleId: [''],
        MenuId: [''],
        select:[''],
      }) 
    ]),

  });
  
  displayedColumns = ['select','ModName'];


  CompanyType_List= ['Corporate', 'Coworking']

  dataSource= new MatTableDataSource<Post_Module>();
  constructor( private router:ActivatedRoute,
    private _Router: Router,
    private fb:FormBuilder,
    
    private role_service:RoleaccessService,
    private toastr: ToastrService,
    private company_service:CompanyService,) 
     { 
      this.AddcompanyForm.get('CompEffDate').setValue(new Date());
      this.CompanyId=parseInt(this.router.snapshot.paramMap.get('Compid'));
     }

  ngOnInit(){

    // this.company_service.GetLocationPhotos().subscribe(res => {
    //   console.log(res);
    //   this.base64Image = res[0];
    // });

    if(this.CompanyId!=0)
    {
      this.showmodules_flag=1;
    this.company_service.Get_CompanyByCode(this.CompanyId).subscribe(res => {
      console.log("fdfdsfdfdsfdf");
      console.log(res);
      this.AddcompanyForm.patchValue(res[0]);
    
       });

       this.role_service.Get_Modulelist().subscribe(res_allmodule => 
        {
       this.role_service.Get_Edit_MenuByCompany(this.CompanyId).subscribe(res_rolebased => 
        {
        this.select=[];
        for(let i=0;i<res_allmodule.length;i++)
        {                
          for(let j=0;j<res_rolebased.length;j++)
          {
            if(res_allmodule[i].ModName===res_rolebased[j].ModName)
            {
              
            this.dataSource.data[i].select=true;
            //  this.selectedFeatures.push(res_allmodule[i].ModId); 
              this.selectedFeatures.splice(i,0,res_rolebased[j].MenuId);    
           
            }
           
            // console.log(i +'-' + this.selectedFeatures);
          }
        }
       });
      });
      }
      else
      {
        this.showmodules_flag=0;
      //  this.company_service.Get_GetCorporateId().subscribe(res => {
      //   this.AddcompanyForm.controls['CorporateId'].setValue(res);
      // });
    }
    

    this.role_service.Get_Modulelist()
    .subscribe(res_allmodule => {
 this.dataSource=new MatTableDataSource(res_allmodule);
    });
   

  }

  get MenuList_Control() {
    return this.AddcompanyForm.get('MenuAccessLst') as FormArray;
  }


  onChange(event,ModId,row) {   

   
    if(event.checked)
    {
    // debugger;
   
       this.selectedFeatures.push(ModId);
       console.log( 'true ' + this.selectedFeatures);   
    }
    else{
          var index = this.selectedFeatures.indexOf(ModId);
          if (index >= 0) {
         this.selectedFeatures.splice( index, 1 );
         console.log('else ' + this.selectedFeatures);  
          }

   }
  }


  GetModules(CompanyType){
    // alert(CompanyType);

    if(CompanyType=="Coworking")

    {

      this.role_service.Get_Modulelist().subscribe(res_allmodule => {
        // Filter the array to keep elements with ModId equal to 1 or 2
        const filteredModules = res_allmodule.filter(item => item.ModId === 1 || item.ModId === 11);
      
        // Now you can use the filteredModules array as the data source for MatTableDataSource
        this.dataSource = new MatTableDataSource(filteredModules);
      });
      
      
    }
    else if(CompanyType=="Corporate"){

      this.role_service.Get_Modulelist()
      .subscribe(res_allmodule => {
   this.dataSource=new MatTableDataSource(res_allmodule);
      });

    }
   

  }

 Post_Company()
 {
  debugger;
  // this.SetValidators();

  const AccessControls = <FormArray>this.MenuList_Control;
  for (let i = AccessControls.length - 1; i >= 0; i--) {
   AccessControls.removeAt(0);
 }
  
 if(this.selectedFeatures.length>=1)
 {
 this.selectedFeatures.forEach(element => {
   this.MenuList_Control.push(
     this.fb.group({              
      MAId: [0],
      CompId: [this.CompanyId],
      RoleId:[0],
      MenuId: [element],
             
     })          
   ); 
 });
} 

  if (this.CompanyId !== 0) {
   
    if (this.AddcompanyForm.valid) {
      this.AddcompanyForm.controls['ModifiedOn'].setValue(new Date());
      this.company_service.putCompany(this.AddcompanyForm.value).subscribe(res => {
        this.company_service.Post_Menucompany(this.AddcompanyForm.value).subscribe(res_menu => {
        this.toastr.success('Company successfully updated');
        this._Router.navigateByUrl('/master/company');
      });
      });
    }
  } else if (this.CompanyId === 0) {
    debugger;
  this.AddcompanyForm.controls['CompId'].setValue(0);
  this.AddcompanyForm.controls['CreatedOn'].setValue(new Date());
    if (this.AddcompanyForm.valid && this.selectedFeatures.length>0) {
      this.company_service.postCompnay(this.AddcompanyForm.value).subscribe(res => {
debugger;
        this.company_service.Post_Menucompany(this.AddcompanyForm.value).subscribe(res_menu => {
        this.toastr.success('Company successfully Saved');
        this._Router.navigateByUrl('/master/company');
        });
        
        
      });
    }
    else
    {
      this.toastr.error('Please Select Module for Company');
    }
  }
 }

 showModules()
 {
this.showmodules_flag=1;
this.ClearValidator();

 }

 checkcapsize(getvalues)
 {
   if(getvalues>=1 && getvalues<=50)
   {
     this.capsize=1;
   }
   else
   {
    this.capsize=0;
   }
 }

 ClearValidator()
 {
   this.AddcompanyForm.get('CompanyName').clearValidators();
   this.AddcompanyForm.get('CompanyName').updateValueAndValidity();

   this.AddcompanyForm.get('CompEmail').clearValidators();
   this.AddcompanyForm.get('CompEmail').updateValueAndValidity();

   this.AddcompanyForm.get('CompContactNo').clearValidators();
   this.AddcompanyForm.get('CompContactNo').updateValueAndValidity();

   this.AddcompanyForm.get('MaxCapSize').clearValidators();
   this.AddcompanyForm.get('MaxCapSize').updateValueAndValidity();

 
 }

 SetValidators()
 {
   
     this.AddcompanyForm.get('CompanyName').setValidators([Validators.required]);
     this.AddcompanyForm.get('CompanyName').updateValueAndValidity();

     this.AddcompanyForm.get('CompEmail').setValidators([Validators.required, Validators.pattern(this.emailPattern)]);
     this.AddcompanyForm.get('CompEmail').updateValueAndValidity();

     this.AddcompanyForm.get('CompContactNo').setValidators([Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]);
     this.AddcompanyForm.get('CompContactNo').updateValueAndValidity();

     this.AddcompanyForm.get('MaxCapSize').setValidators([Validators.required,Validators.max(50), Validators.min(1)]);
     this.AddcompanyForm.get('MaxCapSize').updateValueAndValidity();
 }


 formHasError(controlName: string, errorName: string) {
  return this.AddcompanyForm.controls[controlName].hasError(errorName);

}

}

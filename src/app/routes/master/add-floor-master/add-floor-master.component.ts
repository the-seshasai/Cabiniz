import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDateAdapter, APP_DATE_FORMATS } from '@shared/date.adapter';
import { Company_interface, RoleaccessService } from 'app/routes/modules/roleaccess.service';
import { CompanyService } from 'app/views/company/company.service';
import { ToastrService } from 'ngx-toastr';
import { GetLocation, MasterService } from '../master.service';

@Component({
  selector: 'app-add-floor-master',
  templateUrl: './add-floor-master.component.html',
  styleUrls: ['./add-floor-master.component.scss'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class AddFloorMasterComponent implements OnInit {
  Floorid:any;
  selected=0;
  selected1=0;
  selected2=0;
  selected3=0;
  selected4=0;

  AddFloorForm = this.fb.group({
  FloorId: [''],
  CompId: ['',Validators.required],
  LocId: ['',Validators.required],
  FloorCode:[''],
  FloorName:['',Validators.required],
  FlrEffDate: [''],
  FlrEffStat:[''],
  CreatedBy:[''],
  CreatedOn: [''],
  ModifiedBy:[''],
  ModifiedOn: [''],
  });
  EffectiveStatus_List = ['Active', 'In-Active'];
  Company_List: Array<Company_interface>;
  Location_List: Array<GetLocation>;
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
    private masterservice:MasterService,
  ) {
   
      this.Floorid=parseInt(this.router.snapshot.paramMap.get('Floorid'));
   }

  ngOnInit(): void {

    this.AddFloorForm.get('FlrEffDate').setValue(new Date());
    this.AddFloorForm.get('FlrEffStat').setValue('Active');
    this.companyservice.Get_CompanyList().subscribe(res => {
      console.log(res);
      this.Company_List = res;
    });

    if(this.Floorid)
    {
      this.masterservice.Get_FloorById(this.Floorid).subscribe(res => {
        this.AddFloorForm.patchValue(res[0]);
  
        this.Getlocation(res[0].CompId);
        
      })
    }
  }

  Getlocation(Comid :number)
  {
    this.masterservice.GetLocation_bycompanyid(Comid).subscribe(res_location => {
      this.Location_List = res_location;
    },
    error=>
    {
      this.Location_List=[];
    });
  }

  formHasError(controlName: string, errorName: string) {
    return this.AddFloorForm.controls[controlName].hasError(errorName);
 }

 Post_Floor()
  {
    debugger;
    if (this.Floorid !== 0) {
      if (this.AddFloorForm.valid) {
        this.masterservice.PutFloor(this.AddFloorForm.value).subscribe(res => {
          this.toastr.success('updated successfully');
          this._Router.navigateByUrl('/master/floormasterlist');
        });
      }
    } else if (this.Floorid === 0) {
      
      if (this.AddFloorForm.valid) {
        this.masterservice.PostFloor(this.AddFloorForm.value).subscribe(res => {
        
          this.toastr.success('saved successfully');
          this._Router.navigateByUrl('/master/floormasterlist');
         
        });
      
    }
  }
  }

}

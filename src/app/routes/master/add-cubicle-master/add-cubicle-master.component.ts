import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDateAdapter, APP_DATE_FORMATS } from '@shared/date.adapter';
import { Company_interface, RoleaccessService } from 'app/routes/modules/roleaccess.service';
import { CompanyService } from 'app/views/company/company.service';
import { ToastrService } from 'ngx-toastr';
import { Floor_Interface, GetLocation, MasterService } from '../master.service';


@Component({
  selector: 'app-add-cubicle-master',
  templateUrl: './add-cubicle-master.component.html',
  styleUrls: ['./add-cubicle-master.component.scss'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class AddCubicleMasterComponent implements OnInit {
  Cmid:any;
  selected=0;
  selected1=0;
  selected2=0;
  selected3=0;
  selected4=0;
  selected5=0;
  AddCubicleForm = this.fb.group({
    CMId: [],
    CompId: ['',Validators.required],
    LocId: ['',Validators.required],
    FloorId: ['',Validators.required],
    CubicleCode: [],
    CubicleNo: ['',Validators.required],
    CubicleName: ['',Validators.required],
    TariffPerDay: [],
    AvailableSlot: [],
    CubEffDate: [],
    CubEffStat: [],
    CreatedBy: [],
    CreatedOn: [],
    ModifiedBy: [],
    ModifiedOn: [],
  });
  EffectiveStatus_List = ['Active', 'In-Active'];
  Avilableslot_List = ['Available', 'Not-Available'];
  Company_List: Array<Company_interface>;
  Location_List: Array<GetLocation>;
  Floor_List: Array<Floor_Interface>;
  curmonth = (new Date().getMonth());
  curyear=(new Date().getFullYear());
  curdate=(new Date().getDate());
  minDate = new Date(this.curyear, this.curmonth-3, this.curdate); 
  maxDate = new Date(this.curyear, this.curmonth, this.curdate+7);
  constructor( private router:ActivatedRoute,
    private _Router: Router,
    private fb:FormBuilder,
    private role_service:RoleaccessService,
    private companyservice:CompanyService,
    private masterservice:MasterService,
    private toastr: ToastrService,) { 
      this.AddCubicleForm.get('CubEffDate').setValue(new Date());
      this.AddCubicleForm.get('CubEffStat').setValue('Active');
      this.Cmid=parseInt(this.router.snapshot.paramMap.get('Cmid'));
    }

  ngOnInit(): void {
    this.companyservice.Get_CompanyList().subscribe(res => {
      console.log(res);
      this.Company_List = res;
    });

    if(this.Cmid)
    {
    this.masterservice.GetCubicles_byCubicleId(this.Cmid).subscribe(res => {
      this.AddCubicleForm.patchValue(res[0]);

      this.Getlocation(res[0].CompId);
      this.GetFloor(res[0].LocId)
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

  GetFloor(locationid:number)
  {
    this.masterservice.GetFloors_bylocationid(locationid).subscribe(res_floor => {
      this.Floor_List = res_floor;
    },
    error=>
    {
      this.Floor_List=[];
    });
  }

  formHasError(controlName: string, errorName: string) {
    return this.AddCubicleForm.controls[controlName].hasError(errorName);
 }

  Post_Cubicle()
  {
    debugger;
    if (this.Cmid !== 0) {
      if (this.AddCubicleForm.valid) {
        this.masterservice.PutCubicle(this.AddCubicleForm.value).subscribe(res => {
          this.toastr.success('updated successfully');
          this._Router.navigateByUrl('/master/cubiclemasterlist');
        });
      }
    } else if (this.Cmid === 0) {
      
      if (this.AddCubicleForm.valid) {
        this.masterservice.PostCubicle(this.AddCubicleForm.value).subscribe(res => {
        
          this.toastr.success('saved successfully');
          this._Router.navigateByUrl('/master/cubiclemasterlist');
         
        });
      
    }
  }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company_interface, RoleaccessService } from 'app/routes/modules/roleaccess.service';
import { CompanyService } from 'app/views/company/company.service';
import { ToastrService } from 'ngx-toastr';
import { Floor_Interface, GetLocation, MasterService } from '../master.service';

@Component({
  selector: 'app-add-meeting-room-master',
  templateUrl: './add-meeting-room-master.component.html',
  styleUrls: ['./add-meeting-room-master.component.scss']
})
export class AddMeetingRoomMasterComponent implements OnInit {
  MRMId:any;
  selected=0;
  selected1=0;
  selected2=0;
  selected3=0;
  selected4=0;
  selected5=0;
  AddMeetingRoomForm = this.fb.group({
    MRMId: [''],
    CompId: ['',Validators.required],
    LocId: ['',Validators.required],
    FloorId: ['',Validators.required],
    MRMCode: [],
    MRMNo: ['',Validators.required],
    MRMName: ['',Validators.required],
    TariffPerDay: [],
    AvailableSlot: [],
    MRMEffDate: [],
    MRMEffStat: [],
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
  constructor(
    private router:ActivatedRoute,
    private _Router: Router,
    private fb:FormBuilder,
    private role_service:RoleaccessService,
    private toastr: ToastrService,
    private masterservice:MasterService,
    private companyservice:CompanyService,
  ) 
  {
    this.AddMeetingRoomForm.get('MRMEffDate').setValue(new Date());
    this.AddMeetingRoomForm.get('MRMEffStat').setValue('Active');
    this.MRMId=parseInt(this.router.snapshot.paramMap.get('Mrmid'));
   }

  ngOnInit(): void {
    this.companyservice.Get_CompanyList().subscribe(res => {
      console.log(res);
      this.Company_List = res;
    });

    if(this.MRMId)
    {
      this.masterservice.GetMeetingRoom_byMRId(this.MRMId).subscribe(res => {
        this.AddMeetingRoomForm.patchValue(res[0]);
  
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
    return this.AddMeetingRoomForm.controls[controlName].hasError(errorName);
 }

 Post_meetintroom()
  {
    debugger;
    if (this.MRMId !== 0) {
      if (this.AddMeetingRoomForm.valid) {
        this.masterservice.Put_Meeting(this.AddMeetingRoomForm.value).subscribe(res => {
          this.toastr.success('updated successfully');
          this._Router.navigateByUrl('/master/meetingroommasterlist');
        });
      }
    } else if (this.MRMId === 0) {
      
      if (this.AddMeetingRoomForm.valid) {
        this.masterservice.Post_Meeting(this.AddMeetingRoomForm.value).subscribe(res => {
        
          this.toastr.success('saved successfully');
          this._Router.navigateByUrl('/master/meetingroommasterlist');
         
        });
      
    }
  }
  }

}

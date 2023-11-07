import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDateAdapter, APP_DATE_FORMATS } from '@shared/date.adapter';
import { Company_interface, RoleaccessService } from 'app/routes/modules/roleaccess.service';
import { CompanyService } from 'app/views/company/company.service';
import { ToastrService } from 'ngx-toastr';
import { Floor_Interface, GetAmenities_interface, GetLocation, MasterService } from '../../master.service';
import { CategoryService, Category_Interface } from 'app/routes/category-master/category.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { parse } from 'path';
import { SeatmanagementService } from '../seatmanagement.service';



@Component({
  selector: 'app-addseats',
  templateUrl: './addseats.component.html',
  styleUrls: ['./addseats.component.scss'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class AddseatsComponent implements OnInit {




  SeatUId:any;
  selected=0;
  selected1=0;
  selected2=0;
  selected3=0;
  selected4=0;
  selected5=0;
  selected6=0;
  selected7=0;

  AddSeatmanagementForm = this.fb.group({
    SeatId: [''],
  SeatUId: [''],
  CompId: ['',Validators.required],
  LocId: ['',Validators.required],
  FloorId: ['',Validators.required],
  CategoryUId: ['',Validators.required],
  SeatCode: [''],
  TittleofSeat: [''],
  NoofSeats: [''],
  NoofRooms:[''],
  TariffPerDay: [''],
  AvailableSlot: [''],
  IsParking: [''],
  AmenityId: [''],
  NoOfParkingFourWheeler: [''],
  NoOfParkingTwoWheeler:[''],
  SeatEffDate:[''],
  SeatEffStat: [''],
  CreatedBy: [''],
  CreatedOn:[''],
  ModifiedBy: [''],
  ModifiedOn: [''],
  SeatItemList: this.fb.array([
  ]),
  ParkingItemList: this.fb.array([
  ]),
  RoomMasterList: this.fb.array([
  ]),

  });

  AminitesMaster: any = [];
  EffectiveStatus_List = ['Active', 'In-Active'];
  Avilableslot_List = ['Available', 'Not-Available'];
  Company_List: Array<Company_interface>;
  Category_List: Array<Category_Interface>;
  Amenities_List:Array<GetAmenities_interface>;
  Location_List: Array<GetLocation>;
  Floor_List: Array<Floor_Interface>;
  curmonth = (new Date().getMonth());
  curyear=(new Date().getFullYear());
  curdate=(new Date().getDate());
  minDate = new Date(this.curyear, this.curmonth-3, this.curdate); 
  maxDate = new Date(this.curyear, this.curmonth, this.curdate+7);
  SeatFlag=0;
  WheelerFlag=0;
  roomflag=0;
  S_AminitesMaster="";
  caption: string;
  Globalname: any;
  RoomVisibleFlag=0;
  CabinSeatName: any;
  fourwheelFlag=0;
  twowheelFlag=0;
  CategoryofMeetingRoomid=0;
  constructor( private router:ActivatedRoute,
    private _Router: Router,
    private fb:FormBuilder,
    private role_service:RoleaccessService,
    private companyservice:CompanyService,
    private Category_service:CategoryService,
    private masterservice:MasterService,
    private Seatmanagement_service:SeatmanagementService,
    private toastr: ToastrService,) { 
      this.AddSeatmanagementForm.get('SeatEffDate').setValue(new Date());
      this.AddSeatmanagementForm.get('SeatEffStat').setValue('Active');
      this.SeatUId=this.router.snapshot.paramMap.get('SeatUId');
    }

  ngOnInit(): void {

    this.AddSeatmanagementForm.controls['NoofSeats'].disable();

    this.companyservice.Get_CompanyList().subscribe(res => {
      console.log(res);
      this.Company_List = res;
    });

    this.Category_service.Get_categorylist().subscribe(res => {
      console.log(res);
      this.Category_List = res;
    });

    this.masterservice.GetAmenities_list().subscribe(res => {
      console.log(res);
      this.Amenities_List = res.filter(s=>s.AmenityDescription=="Two wheeler Parking" || s.AmenityDescription=="Four wheeler Parking");
    });

    if(this.SeatUId)
    {
    this.Seatmanagement_service.Get_SeatmanagementByid(this.SeatUId).subscribe(res => {
      debugger;
    //  this.AddSeatmanagementForm.patchValue(res[0]);
    this.AddSeatmanagementForm.get('CompId').setValue(res[0].CompId);
      this.Getlocation(res[0].CompId);
      this.AddSeatmanagementForm.get('LocId').setValue(res[0].LocId);
      this.GetFloor(res[0].LocId);
      this.AddSeatmanagementForm.get('FloorId').setValue(res[0].FloorId);
      this.AddSeatmanagementForm.get('CategoryUId').setValue(res[0].CategoryUId);
      this.ShowControl(res[0].CategoryUId);
      this.AddSeatmanagementForm.get('NoofRooms').setValue(res[0].NoofRooms);
      this.AddSeatmanagementForm.get('TittleofSeat').setValue(res[0].TittleofSeat);
      this.AddSeatmanagementForm.get('NoofSeats').setValue(res[0].NoofSeats);
      this.AddSeatmanagementForm.get('IsParking').setValue(res[0].IsParking);
      this.AddSeatmanagementForm.get('AmenityId').setValue(res[0].AmenityId);
      this.AddSeatmanagementForm.get('NoOfParkingFourWheeler').setValue(res[0].NoOfParkingFourWheeler);
      this.AddSeatmanagementForm.get('NoOfParkingTwoWheeler').setValue(res[0].NoOfParkingTwoWheeler);
      this.AddSeatmanagementForm.get('SeatEffDate').setValue(res[0].SeatEffDate);
      this.AddSeatmanagementForm.get('SeatEffStat').setValue(res[0].SeatEffStat);
      this.AddSeatmanagementForm.get('CreatedBy').setValue(res[0].CreatedBy);
      this.AddSeatmanagementForm.get('CreatedOn').setValue(res[0].CreatedOn);

      
      if(res[0].NoofSeats || res[0].NoofRooms)
      {
        this.SeatFlag=1;
        
      }
     

      if(res[0].NoofRooms)
      {
        this.RoomVisibleFlag=1;
        
      }

      if(res[0].NoOfParkingFourWheeler || res[0].NoOfParkingTwoWheeler)
      {
        this.WheelerFlag=1;
      
      }


      res[0].SeatItemList.map(val => {
        this.SeatNameControl.push(
          this.fb.group({
            SeatItemName: [val.SeatItemName],
            AvailableSlot: [val.AvailableSlot],
          })
         );
       });

       res[0].RoomMasterList.map(val => {
        this.CabinSeatName=val.RoomName.substring(0, 1);
        // if(val.Capacity)
        // {
        //   this.SeatFlag=1;
          
        // }
        this.RooMasterControl.push(
          this.fb.group({
            RoomName: [val.RoomName],
            Capacity: [val.Capacity],
            AvailableSlot: [val.AvailableSlot],
          })
         ); 
       });

       res[0].ParkingItemList.map(val => {
        this.ParkingNameControl.push(
          this.fb.group({
            ParkingName: [val.ParkingName],
            AvailableSlot: [val.AvailableSlot],
          })
         );
       });



      this.S_AminitesMaster=res[0].AmenityId;
     var a1 = res[0].AmenityId.split(",").map(x => Number(x))

     // Gastro Intestinal System
   this.masterservice.GetAmenities_list().subscribe(res => {
    this.Amenities_List =res.filter(s=>s.AmenityDescription=="Two wheeler Parking" || s.AmenityDescription=="Four wheeler Parking");
    var b1 = this.Amenities_List.map((x) => {
      return {
        "AmenityId": x.AmenityId,
        "val": false
      }
    })
    for (var i = 0; i < b1.length; i++) {
      for (var j = 0; j < a1.length; j++) {
        if (b1[i].AmenityId == a1[j]) {
          this.Amenities_List[i].Select=true;
          this.AminitesMaster.push(a1[j]);
        }
      }
    }

    for(let i=0;i<this.AminitesMaster.length;i++)
    {
      if(this.AminitesMaster[i]==6)
      {
        this.twowheelFlag=1;
      }
      if(this.AminitesMaster[i]==7)
      {
        this.fourwheelFlag=1;
      }
    }
  });
    
    });


     
  }

  
  }


  get SeatNameControl() {
    return this.AddSeatmanagementForm.get('SeatItemList') as FormArray;
  }

  
  get ParkingNameControl() {
    return this.AddSeatmanagementForm.get('ParkingItemList') as FormArray;
  }

  get RooMasterControl() {
    return this.AddSeatmanagementForm.get('RoomMasterList') as FormArray;
  }

  

  onChange_GI(event,value)
  {
    debugger;
    if(event.checked)
    {
       this.AminitesMaster.push(value.AmenityId);
       this.AddSeatmanagementForm.get('IsParking').setValue('Yes');
       for(let i=0;i<this.AminitesMaster.length;i++)
       {
         if(this.AminitesMaster[i]==6)
         {
           this.twowheelFlag=1;
         }
         if(this.AminitesMaster[i]==7)
         {
           this.fourwheelFlag=1;
         }
       }

    }
    else{
      this.AddSeatmanagementForm.get('IsParking').setValue('No');
          var index = this.AminitesMaster.indexOf(value.AmenityId);
          if (index >= 0) {
         this.AminitesMaster.splice( index, 1 );
         console.log('else ' + this.AminitesMaster);  
          }

         
            if(value.AmenityId==6)
            {
             
              this.twowheelFlag=0;
            }
           else if(value.AmenityId==7)
            {
             
              this.fourwheelFlag=0;
             
           
          }
        } 


       
       
       
        
    console.log( this.AminitesMaster);
    // debugger;
     this.S_AminitesMaster=this.S_AminitesMaster + "," + value.AmenityId;  
    this.AddSeatmanagementForm.get('AmenityId').setValue(this.S_AminitesMaster);
   
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
    return this.AddSeatmanagementForm.controls[controlName].hasError(errorName);
 }

 ShowControl(value)
 {
  this.AddSeatmanagementForm.get('TittleofSeat').setValue('');
  this.AddSeatmanagementForm.get('NoofSeats').setValue('');
  this.AddSeatmanagementForm.get('NoofRooms').setValue('');
  
  this.RooMasterControl.controls.splice(0, this.RooMasterControl.length);
  this.SeatNameControl.controls.splice(0, this.SeatNameControl.length);
  this.ParkingNameControl.controls.splice(0, this.ParkingNameControl.length);

  // if(value=="d45b9cda-a9eb-4f87-a136-af5e42997ffe")
  // {
  // this.roomflag=1;
  // this.RoomVisibleFlag=0;
  // this.SeatFlag=0;
  // this.CategoryofMeetingRoomid=0;
  // this.caption="No of Private Cabin";
 
  // }
  if(value=="92bca5a1-8c83-41e1-8478-b8ab7c4f3c17" || value=="67f62183-9846-4b01-9bee-eaa0572997d5")
  {
  this.roomflag=1;
  this.RoomVisibleFlag=0;
  this.SeatFlag=0;
  this.Category_service.Get_categorylistByid(value).subscribe(res => {
  this.caption=res[0].CategoryName;
  });
  this.CategoryofMeetingRoomid=1;
 
  }
  else{
   
    this.roomflag=1;
    this.RoomVisibleFlag=0;
    this.SeatFlag=0;
    this.CategoryofMeetingRoomid=0;
    this.Category_service.Get_categorylistByid(value).subscribe(res => {
    this.caption=res[0].CategoryName;
    });
  }
 }


 AssignSeatName(value)
 {
  
  this.Globalname=value.substring(0, 1);
  this.AddSeatmanagementForm.controls['NoofSeats'].enable();
 
 }

 AssignCabinSeatName(row:number)
 {
  
  this.RooMasterControl.controls[row].get('Capacity').enable();
  this.CabinSeatName=this.RooMasterControl.controls[row].get('RoomName').value.substring(0, 1);
 }

 addRoomRow()
 {
  this.RooMasterControl.push(
    this.fb.group({
      RoomName: [''],
      Capacity:[''],
      AvailableSlot: ['Available'],
     
    })
  );

 
 }
 UpdateRoomCount(value)
 {
   
  // this.SeatNameControl.controls.splice(0, this.SeatNameControl.length);
   if(value)
   {
     this.RoomVisibleFlag=1;
     for(let i=0;i<value;i++)
     {
       
      this.addRoomRow();
     }
     for(let i=0;i<this.RooMasterControl.length;i++)
     {
       this.RooMasterControl.controls[i].get('Capacity').disable();
     }
   }
   else
   {
     this.RoomVisibleFlag=0;
     this.SeatFlag=0;
     this.RooMasterControl.controls.splice(0, this.RooMasterControl.length);
     this.SeatNameControl.controls.splice(0, this.SeatNameControl.length)
   }
  
 }

 // second update 

 UpdateSeatCount(value,row)
 {
   
  // this.SeatNameControl.controls.splice(0, this.SeatNameControl.length);
   if(value)
   {
     this.SeatFlag=1;
     this.CabinSeatName=this.RooMasterControl.controls[row].get('RoomName').value.substring(0, 1);
     for(let i=0;i<value;i++)
     {
       let s=i+1;
      this.addRow(this.CabinSeatName.toUpperCase() + '-' + s);
     }
   }
   else
   {
     this.SeatFlag=0;
     this.SeatNameControl.controls.splice(0, this.SeatNameControl.length)
   }
  
 }

 deleteRoomRow(row: number) {
  this.RooMasterControl.removeAt(row);
  let value=this.RooMasterControl.controls["row"].get('Capacity').value;
  this.RooMasterControl.controls["row"].get('Capacity').setValue(value-1);
  }



  addRow(seatname) {
        this.SeatNameControl.push(
          this.fb.group({
            SeatItemName: [seatname],
            AvailableSlot: ['Available'],
           
          })
        );
  }
  updateTextboxCount(value)
  {
    
   // this.SeatNameControl.controls.splice(0, this.SeatNameControl.length);
    if(value)
    {
      this.SeatFlag=1;
      for(let i=0;i<value;i++)
      {
        let s=i+1;
       this.addRow(this.Globalname.toUpperCase() + '-' + s);
      }
    }
    else
    {
      this.SeatFlag=0;
      this.SeatNameControl.controls.splice(0, this.SeatNameControl.length)
    }
   
  }
  deleteRow(row: number) {
    this.SeatNameControl.removeAt(row);
    let value=this.AddSeatmanagementForm.get('NoofSeats').value;
    this.AddSeatmanagementForm.get('NoofSeats').setValue(value-1);
    }



  addRowwheelr() {
    this.ParkingNameControl.push(
      this.fb.group({
        ParkingName: [''],
        AvailableSlot: ['Available'],
       
      })
    );
}

updateTextboxCounttw()
{
  let twowheeler=this.AddSeatmanagementForm.get('NoOfParkingFourWheeler').value;
  let fourwheeler=this.AddSeatmanagementForm.get('NoOfParkingTwoWheeler').value;
  let value=0;
   if(twowheeler)
  {
    value=twowheeler;
  }
  else if(fourwheeler)
  {
    value=fourwheeler;
  }
  
  
  if(value)
  {
    this.WheelerFlag=1;
    for(let i=0;i<value;i++)
    {
     this.addRowwheelr();
    }
  }
  else{
    this.WheelerFlag=0;
  }
 
}

deleteRowforwheeler(row: number) {
  this.ParkingNameControl.removeAt(row);
  let value=this.AddSeatmanagementForm.get('NoOfParkingFourWheeler').value;
  if(value!=0)
  {
  this.AddSeatmanagementForm.get('NoOfParkingFourWheeler').setValue(value-1);
  }
  if(value==0)
  {
    let value1=this.AddSeatmanagementForm.get('NoOfParkingTwoWheeler').value;
    this.AddSeatmanagementForm.get('NoOfParkingTwoWheeler').setValue(value1-1);
  }
  }



  Post_seatmanagement()
  {
    debugger;
   
    if (this.SeatUId !== '0') {
      if (this.AddSeatmanagementForm.valid) {
        this.AddSeatmanagementForm.get('AmenityId').setValue(this.S_AminitesMaster.replace(/^,|,$/g,''));
        this.Seatmanagement_service.putSeatmanagement(this.AddSeatmanagementForm.value).subscribe(res => {
          this.toastr.success('updated successfully');
          this._Router.navigateByUrl('/master/master/seatmanagement');
        });
      }
    } else if (this.SeatUId === '0') {
      
      if (this.AddSeatmanagementForm.valid) {
        this.Seatmanagement_service.postSeatmanagement(this.AddSeatmanagementForm.value).subscribe(res => {
        
          this.toastr.success('saved successfully');
          this._Router.navigateByUrl('/master/master/seatmanagement');
         
        });
      
    }
  }
  }

}

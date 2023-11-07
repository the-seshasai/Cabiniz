import { DatePipe } from '@angular/common';
import { FnParam } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PopDialogCityComponent } from '../pop-dialog-city.component';
import { BookingService, Load_WorkSpaceBy_City, ShowAvailable, ShowAvailableSeats_interface } from './Services/booking.service';

@Component({
  selector: 'app-seatselection',
  templateUrl: './seatselection.component.html',
  styleUrls: ['./seatselection.component.css']
})
export class SeatselectionComponent implements OnInit {
  flag=0;
  flag1=0;
  flag2=0;
  selected2=0;
  selected=0;
  AvailableStatusCheck:string;
  NoOfDaysFromandTo:number;
  fromDate:any;
  TempArrFromTime:string[];
  TemparrToTime:string[];
  BookFromTime:string;
  BookToTime:string;
  City:string;
  toDate:any;
  DiffDate:any;
  cityname:string;
  TimeSlots:string;
  CubicleName_add="";
  CubicleNo="";
  BookingTypeS:String;
  AvailableSeat:number;
  TariffPerDay:number;
  isChecked;
  isCheckedName;
  checkboxData = [1,2,3,4,5,6,7,8];
  LoadWorkSpaceByCity: Array<Load_WorkSpaceBy_City>;
  ImageList: Array<ShowAvailable>;
  ShowAvailableSeats: Array<ShowAvailableSeats_interface>;
  City_List = ['Chennai', 'Bangalore','kolkata'];
  TypeofMeeting_List = ['Conference', 'Cubicle'];
  Timeslot_List = ['Early morning- From 8am to 5pm', 'Late Morning- From 10am to 7pm','Afternoon- From 3pm to 12pm'];
  CityForm = this.fb.group({
    // FromDate:['',Validators.required],
    // ToDate:['',Validators.required],
   // TimeSlot:['',Validators.required],
    // Typeroom:['',Validators.required],

 BookingId: [''],
  UserCode: [''],
  BookingType: ['',Validators.required],
  CompId: [''],
  LocId: [''],
  FloorId: [''],
  SeatNo: [''],
  SeatName: [''],
  BookedFrom: ['',Validators.required],
  BookedTo: ['',Validators.required],
  BookedNoDays: [''],
  TotalAmount: [''],
  PaymentMode: ['Cash'],
  IsPaid: ['No'],
  BookedOn: [''],
  BookedBy: [''],
  ModifiedOn: [''],
  ModifiedBy: [''],
  ApprovalStatus: ['Pending'],

  });
  orgstructure:any;
  constructor( 
    private router:ActivatedRoute,
    private _Router: Router,
    private fb:FormBuilder,
    private datePipe:DatePipe,
    private toastr: ToastrService,
    private dialog: MatDialog,
    
  private booking_service:BookingService
    ) { 
    // this.cityname=this.router.snapshot.paramMap.get('cityname');
    this.router.queryParams.subscribe(params => {
      // this.CityForm.get('BookedFrom').setValue(this.datePipe.transform(params.BookFromDate, 'dd-MM-yyyy') + ' ' + params.BookFromTime.toString());
      // this.CityForm.get('BookedFrom').setValue(new Date(params.BookFromDate));
      this.fromDate=params.BookFromDate;
      // this.CityForm.get('BookedTo').setValue(this.datePipe.transform(params.BookToDate, 'dd-MM-yyyy') + ' ' + params.BookToTime.toString());
      // this.CityForm.get('BookedTo').setValue(new Date(params.BookToDate));
      this.toDate=params.BookToDate;
      
      this.BookFromTime=params.BookFromTime.toString();
       this.TempArrFromTime=this.BookFromTime.split(':');
      this.BookToTime=params.BookToTime.toString();
      this.TemparrToTime=params.BookToTime.split(':');
      this.cityname=params.City;
      this.CityForm.get('BookingType').setValue(params.SeatType);
      this.BookingTypeS=params.SeatType;
      this.NoOfDaysFromandTo=parseInt(params.NoofDays);

console.log(params.BookFromTime +"-"+ params.BookToTime);
console.log(this.datePipe.transform(params.BookFromDate, 'yyyy-MM-dd ') + params.BookFromTime);
console.log(this.datePipe.transform(params.BookToDate, 'yyyy-MM-dd ') + params.BookToTime);

console.log((new Date(params.BookToDate)));
console.log(new Date(params.TimewithFromDate).toUTCString() + '-' + new Date(params.TimewithToDate).toISOString() + "-" + params.City + "- " + params.SeatType + "-" + this.cityname +"-" +  this.NoOfDaysFromandTo)
      
    
      //  this.CityForm.get('BookedFrom').setValue(new Date(params.TimewithFromDate).toISOString());
      //  this.CityForm.get('BookedTo').setValue(new Date(params.TimewithToDate).toISOString());

       this.CityForm.get('BookedFrom').setValue(this.datePipe.transform(params.BookFromDate, 'yyyy-MM-dd ')  + params.BookFromTime);
       this.CityForm.get('BookedTo').setValue(this.datePipe.transform(params.BookToDate, 'yyyy-MM-dd ') + params.BookToTime);
    });
    // this.datePipe.transform(this.TodayDate, 'yyyy-MM-dd')
   
  }
 
  LoadWorkSpaceByCity_count=0;
  ngOnInit(): void {
    this.booking_service.get_LoadWorkSpaceByCity(this.cityname).subscribe(res => {
      this.LoadWorkSpaceByCity = res;
      
      console.log(this.LoadWorkSpaceByCity);
      this.LoadWorkSpaceByCity_count=res.length;
    },
    error=>
    {
this.toastr.error('No Record found....');
    });

   

  }

  formHasError(controlName: string, errorName: string) {
    return this.CityForm.controls[controlName].hasError(errorName);
  }
  Show(companyname,locationname,i)
  {
    this.isChecked=false;
   this.flag=i;
  //  this.booking_service.get_ShowAvailableSeats(companyname,locationname).subscribe(res => {
  //    this.CityForm.get('CompId').setValue(res[0].CompId);
  //    this.CityForm.get('LocId').setValue(res[0].LocId);
  //    this.CityForm.get('FloorId').setValue(res[0].FloorId);
  //    this.TariffPerDay=res[0].TariffPerDay;
  //   this.ShowAvailableSeats = res;
  //   console.log(this.ShowAvailableSeats);
  //   this.CubicleName_add="";
  //   this.CubicleNo="";
  
  // });

     this.booking_service.get_ShowAvailabl(companyname,locationname,
       this.datePipe.transform(this.fromDate, 'yyyy-MM-dd'),
      this.datePipe.transform(this.toDate, 'yyyy-MM-dd'),
      this.TempArrFromTime[0], this.TemparrToTime[0], this.BookingTypeS).subscribe(res => {
      this.ImageList = res;
      this.CityForm.get('CompId').setValue(res[0].CompId);
      this.CityForm.get('LocId').setValue(res[0].LocId);
     this.CityForm.get('FloorId').setValue(res[0].FloorId);
     
     this.TariffPerDay=res[0].TariffPerDay;
      console.log(this.LoadWorkSpaceByCity);
      this.LoadWorkSpaceByCity_count=res.length;
    },
    error=>
    {
this.toastr.error('No Record found, for Seat type Conference');
    });


  }
  Show1()
  {
   this.flag1=1;
  }
  Show2()
  {
   this.flag2=1;
  }


//   addEvent( event: MatDatepickerInputEvent<Date>) {
//     this.CityForm.get('BookedFrom').setValue(event.value);
//     this.fromDate=event.value;
//   }
//   ToaddEvent( event: MatDatepickerInputEvent<Date>) {
//     this.CityForm.get('BookedTo').setValue(event.value);
//     this.toDate=event.value;
//   }
//   GetTimeSlot(events)
//   {
// this.TimeSlots=events;
//   }

  eventCheck(getvalue,getCubicleNo,i1)
  {
      // this.CubicleName_add=getvalue + ',' + this.CubicleName_add;
      // this.CubicleNo=getCubicleNo + ',' + this.CubicleNo;
      // this.CityForm.get('SeatName').setValue(this.CubicleName_add);
      //  this.CityForm.get('SeatNo').setValue(0);
     
  }
  Post_Booking()
  {
    debugger;
    let Amount=0;
  
    if(this.CityForm.valid)
    {
    this.CityForm.controls['BookedOn'].setValue(new Date());
     // this.DiffDate=Math.floor((Date.UTC(this.toDate.getFullYear(),this.toDate.getMonth(),this.toDate.getDate())-Date.UTC(this.fromDate.getFullYear(),this.fromDate.getMonth(),this.fromDate.getDate()) )/(1000 * 60 * 60 * 24));
      this.CityForm.get('BookedNoDays').setValue(this.NoOfDaysFromandTo);
      Amount= this.NoOfDaysFromandTo * this.TariffPerDay;
      this.CityForm.get('TotalAmount').setValue(Amount);
      this.CityForm.get('ModifiedOn').setValue(null);
      this.CityForm.get('ModifiedBy').setValue(null);
      this.CityForm.get('BookingId').setValue(0);
      this.booking_service.Post_Booking(this.CityForm.value).subscribe(res => {
        console.log(res);
          this.toastr.success('Successfully Saved');
          this._Router.navigateByUrl('/booking/city');
      });
     }
     else
     {
       if(this.CityForm.get('BookedFrom').invalid)
       {
        this.toastr.error('Select From Date');
       }
    else if(this.CityForm.get('BookedTo').invalid)
       {
        this.toastr.error('Select To Date');
       }
    else if(this.CityForm.get('BookingType').invalid)
       {
        this.toastr.error('Select Type');
       }
     }
  }

  PageRedirect()
  {
    this._Router.navigateByUrl('/booking/seatselection');
    setTimeout (() => {
      this.OpenDialogue_City();
    }, 1000);
  }

  OpenDialogue_City()
  {
    const dialogRef = this.dialog.open(PopDialogCityComponent, {
      width: '50%',
      height:'45%',
      data: {
        //url: 'Booking/GetAppointmentById',
        disableClose: true
      }
    });
    dialogRef.afterClosed().subscribe(res => {
     
      
    });
  }

  onChange(e,row,CubicleNo){   
    
     this.isChecked = !this.isChecked;
    this.isCheckedName = e.target.name;
    debugger;
    this.CityForm.get('SeatName').setValue(e.target.name);
    this.CityForm.get('SeatNo').setValue(CubicleNo);
  }
}

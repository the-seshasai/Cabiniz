import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from './Services/booking.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  cityname='';
  todayDate:Date = new Date();
  TotalBookings:number;
  TotalBookingsper:number;
  Pending: number;
  pendingPer:any;
  Approved: number;
  Approvedper:any;
  Rejected: number;
  Rejectedpre:any;
  CityForm = this.fb.group({
    FromDate:['',Validators.required],
    ToDate:['',Validators.required],
    // TimeSlot:['',Validators.required],
    Typeroom:['',Validators.required],
    BookFromTime:['',Validators.required],
    BookToTime:['',Validators.required],
    CarParking:[''],
  });
  mySelect = 'Select One';
  selectedValue: any;
  selected=0;
  selected1=0;
  selected2=0;
  selected3=0;
  City_List = ['Chennai', 'Bangalore','kolkata'];
  carparking_List = ['Yes', 'No'];
  TypeofMeeting_List = ['Conference', 'Cubicle'];
  Timeslot_List = ['Early morning- From 8am to 5pm', 'Late Morning- From 10am to 7pm','Afternoon- From 3pm to 12pm'];
  constructor(
    private router:ActivatedRoute,
    private _Router: Router,
    private fb:FormBuilder,
    private toastr: ToastrService,
    private booking_service:BookingService,) { 
    this.cityname=localStorage.getItem('getCity') ; 
    }

  ngOnInit(): void {
    this.booking_service.get_UserDashboardCount(localStorage.getItem('UserId'))
    .subscribe(res => {
        this.TotalBookings=res[0].TotalBookings;
        if(this.TotalBookings==0)
        {
    this.TotalBookingsper=0;
        }
        else
        {
          this.TotalBookingsper=100;
        }
        this.Pending=res[0].Pending;
        this.pendingPer=(this.Pending / this.TotalBookings) * 100;
       
        this.Approved=res[0].Approved;
        this.Approvedper=(this.Approved / this.TotalBookings) * 100;

        this.Rejected=res[0].Rejected;
        this.Rejectedpre=(this.Rejected / this.TotalBookings) * 100;
       
       
       },
       error=>
       {
         this.TotalBookings=0;
       });

  }
  Post_City() {
 
    let fromDate= this.CityForm.get('FromDate').value;
    let toDate= this.CityForm.get('ToDate').value;
    let FromTime=this.CityForm.get('BookFromTime').value;
    let ToTime=this.CityForm.get('BookToTime').value;
    let DiffDate=Math.floor((Date.UTC(toDate.getFullYear(),toDate.getMonth(),toDate.getDate())-Date.UTC(fromDate.getFullYear(),fromDate.getMonth(),fromDate.getDate()) )/(1000 * 60 * 60 * 24));

    const yy = new Date(fromDate).getFullYear();
    const mm = new Date(fromDate).getMonth();
    const dd = new Date(fromDate).getDate();
    const yy1 = new Date(toDate).getFullYear();
    const mm1= new Date(toDate).getMonth();
    const dd1 = new Date(toDate).getDate();
   let Fromtimes=FromTime.split(":");
   let Totimes=ToTime.split(":");
    const completeFromDate = new Date(yy, mm, dd, Fromtimes[0]);
    const completeToDate = new Date(yy1, mm1, dd1, Totimes[0]);

   

   
   
   if(this.CityForm.valid)
   {
    if(Fromtimes[0]<Totimes[0])
    {
  this._Router.navigate(['/booking/seatselection'], {
    queryParams: {
      BookFromDate: this.CityForm.get('FromDate').value,
      BookFromTime: this.CityForm.get('BookFromTime').value,
      BookToDate: this.CityForm.get('ToDate').value,
      BookToTime: this.CityForm.get('BookToTime').value,
      City: localStorage.getItem('getCity'),
      SeatType: this.CityForm.get('Typeroom').value,
      NoofDays:DiffDate,
      TimewithFromDate:completeFromDate,
      TimewithToDate:completeToDate,
    }
  });
   }
    else{
      this.toastr.error('ToTime should be greater than FromTime and shoule not be same');
    }
   }
   
}
formHasError(controlName: string, errorName: string) {
  return this.CityForm.controls[controlName].hasError(errorName);
}

hourSelected(value) {
  console.log(value)
}

}

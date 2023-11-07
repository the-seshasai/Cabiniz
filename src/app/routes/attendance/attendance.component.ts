import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDateAdapter, APP_DATE_FORMATS } from '@shared/date.adapter';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';
import { Attendance_Interface, BookingService } from '../booking/booking.service';
import { PopViewMapComponent } from '../pop-view-map/pop-view-map.component';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class AttendanceComponent implements OnInit {
  searchText = new FormControl('');
  AttendanceForm = this.fb.group({
    FromDate:['',Validators.required],
  });
  
  attendanceCount=0;
  INGeoLocationlat:string;
  INGeoLocationlong:string;
  OUTGeoLocationlat:string;
  OUTGeoLocationlong:string;
  isLoading=true;
  displayedColumns = ['UserCode','LocName','BuildingName','FloorName','INTime','InLocation','OUTTime','OutLocation'];
  dataSource = new MatTableDataSource<Attendance_Interface>();
  TodayDate=new Date();

  curmonth = (new Date().getMonth());
  curyear=(new Date().getFullYear());
  curdate=(new Date().getDate());
  E_maxDate = new Date(this.curyear, this.curmonth, this.curdate);
  constructor( private router:ActivatedRoute,
    private _Router: Router,
    private fb:FormBuilder,
    private datePipe: DatePipe,
    private booking_service:BookingService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    ) { 
      this.AttendanceForm.controls['FromDate'].setValue(this.TodayDate);
    }

  ngOnInit() {
    this.searchText.valueChanges.pipe(debounceTime(500)).subscribe(val => {
      this.dataSource.filter = val.trim().toLowerCase();
      
    });

   
this.ShowTodayAttendance();
   
  }

  Refersh_attendance()
  {
    this.AttendanceForm.controls['FromDate'].setValue(this.TodayDate);
    this.ShowTodayAttendance();
  }

ShowTodayAttendance()
{
  let SendDate=this.datePipe.transform(this.datePipe.transform(this.TodayDate, 'yyyy-MM-dd'));
  this.booking_service.Get_AttendanceList(SendDate,localStorage.getItem('roleId'),localStorage.getItem('UserId')).subscribe(res => {
    console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.attendanceCount = this.dataSource.filteredData.length;
      this.isLoading = false;      
     },
     error => 
     {
      this.dataSource = new MatTableDataSource();
        this.isLoading = false;
        this.attendanceCount=0;
     }
  );
}
  
  formHasError(controlName: string, errorName: string) {
    return this.AttendanceForm.controls[controlName].hasError(errorName);
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    let SendDate=this.datePipe.transform(event.target.value, 'yyyy-MM-dd');
      this.booking_service.Get_AttendanceList(SendDate,localStorage.getItem('roleId'),localStorage.getItem('UserId')).subscribe(res => {
        console.log(res);
          this.dataSource = new MatTableDataSource(res);
          this.attendanceCount = this.dataSource.filteredData.length;
          this.isLoading = false;
         },
         error => 
         {
          this.dataSource = new MatTableDataSource();
            this.isLoading = false;
            this.attendanceCount=0;
         }
      );
    }

    openDialog_viewMapout(Outlatlong)
    {
      let outx = Outlatlong.replace(/[{()}]/g, '');
      let B1=[];
      let B2=[];
      let B3=[];
      let sout=outx.toString();
      B1=sout.split(',');
      let outs1=B1[0].toString();
      B2=outs1.split(':');
      let outs2=B1[1].toString();
      B3=outs2.split(':');
      let outLatitude=B2[1];
      let outLongitude=B3[1];
      const dialogRef = this.dialog.open(PopViewMapComponent, {
        width: '100%',
        height: '60%',
        data: {
          MapFlag:'Out',
          outlongitudes:outLongitude,
          outLatitudes:outLatitude
        }
      });
      dialogRef.afterClosed().subscribe(res => {
           
      });
    

    }

    openDialog_viewMap(InslatLong)
    {
      let inx = InslatLong.replace(/[{()}]/g, '');
     
      let A1=[];
      let A2=[];
      let A3=[];
      let sin=inx.toString();
      A1=sin.split(',');
      let ins1=A1[0].toString();
      A2=ins1.split(':');
      let ins2=A1[1].toString();
      A3=ins2.split(':');
     
      let inLatitude=A2[1];
      let inLongitude=A3[1];

      //  alert(`${inLatitude},${inLongitude}`)
        const dialogRef = this.dialog.open(PopViewMapComponent, {
          width: '100%',
          height: '60%',
          data: {
            MapFlag:'In',
            inlongitudes:inLongitude,
            inLatitudes:inLatitude,
           
          }
        });
        dialogRef.afterClosed().subscribe(res => {
             
        });
      
    }
}


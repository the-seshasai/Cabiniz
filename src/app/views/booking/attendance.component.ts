import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Attendance_Interface, BookingService } from './Services/booking.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './date.adapter';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
  // providers: [
  //   {
  //       provide: DateAdapter, useClass: AppDateAdapter
  //   },
  //   {
  //       provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
  //   }
  //   ]
})
export class AttendanceComponent implements OnInit {
  searchText = new FormControl('');
  AttendanceForm = this.fb.group({
    FromDate:['',Validators.required],
  });

  attendanceCount=0;
  isLoading=true;
  displayedColumns = ['AttId','CompName','LocName','BuildingName','FloorName','UserCode','INTime','OUTTime'];
  dataSource = new MatTableDataSource<Attendance_Interface>();
  TodayDate=new Date();

  curmonth = (new Date().getMonth());
  curyear=(new Date().getFullYear());
  curdate=(new Date().getDate());
  E_maxDate = new Date(this.curyear, this.curmonth, this.curdate+7);
  constructor( private router:ActivatedRoute,
    private _Router: Router,
    private fb:FormBuilder,
    private datePipe: DatePipe,
    private booking_service:BookingService
    ) { 
      this.AttendanceForm.controls['FromDate'].setValue(this.TodayDate);
    }

  ngOnInit() {
    this.searchText.valueChanges.pipe(debounceTime(500)).subscribe(val => {
      this.dataSource.filter = val.trim().toLowerCase();
      
    });
  }


  
  formHasError(controlName: string, errorName: string) {
    return this.AttendanceForm.controls[controlName].hasError(errorName);
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    let SendDate=this.datePipe.transform(event.target.value, 'yyyy-MM-dd');
      this.booking_service.Get_AttendanceList(SendDate).subscribe(res => {
        console.log(res);
          this.dataSource = new MatTableDataSource(res);
          this.attendanceCount = this.dataSource.filteredData.length;
          this.isLoading = false;
         },
         error => 
         {
          this.dataSource = new MatTableDataSource();
            this.isLoading = true;
            this.attendanceCount=0;
         }
      );
    }
}

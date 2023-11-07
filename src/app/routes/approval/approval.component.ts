import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApproverStatusComponent } from '../approver-status/approver-status.component';
import { BookingService, Get_ForManager } from '../booking/booking.service';



@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.scss']
})
export class ApprovalComponent implements OnInit {

  name = 'Angular 5';
  RoleId:number;
  displayedColumns = ['BuildingName','Area','FullName', 'BookedOn', 'BookedFrom','BookedTo','SeatName' ,'BookingType','BookedNoDays','ApprovalStatus', 'Action'];
  // dataSource = new MatTableDataSource<ListBookedWorkSpace_interface>();
  dataSource = new MatTableDataSource<Get_ForManager>();

  displayedColumns_Hr =['BuildingName','Area','FullName', 'BookedOn', 'BookedFrom','BookedTo','SeatName' ,'BookingType','BookedNoDays','ApprovalStatus', 'Action'];
  dataSource_Hr = new MatTableDataSource<Get_ForManager>();

  ApproverStatus = this.fb.group({
    BookingId: [''],
  UserCode: [''],
  BookingType: [''],
  CompId: [''],
  LocId: [''],
  FloorId: [''],
  SeatNo:[''],
  SeatName:[''],
  BookedFrom: [''],
  BookedTo: [''],
  BookedNoDays: [''],
  TotalAmount:[''],
  PaymentMode: [''],
  IsPaid:[''],
  BookedOn: [''],
  BookedBy: [''],
  ModifiedOn: [''],
  ModifiedBy: [''],
  ApprovalStatus:[''],
  CompanyName: [''],
  BuildingName: [''],
  Area: [''],
  FloorName: [''],
  });
  constructor( private dialog: MatDialog,
    private _Router: Router,
    private fb:FormBuilder,
    private datePipe:DatePipe,
    private toastr: ToastrService,
  private booking_service:BookingService
    ) {
      this.RoleId=parseInt(localStorage.getItem('roleId'));
     }

  ngOnInit(): void {

    // this.booking_service.Get_ListBookedWorkSpace().subscribe(resvalues => {
    //   console.log(resvalues);
    //     this.dataSource = new MatTableDataSource(resvalues);
       
    //    },
    //    error => 
    //    {
    //     this.dataSource = new MatTableDataSource();
        
    //    }
    // );
    this.ShowApproveList();

  }

  ShowApproveList()
  {
       
if(this.RoleId==3)
{
   
    this.booking_service.Get_ForManager(localStorage.getItem('UserId')).subscribe(resvalues => {
      console.log(resvalues);
        this.dataSource = new MatTableDataSource(resvalues);
       },
       error => 
       {
        this.dataSource = new MatTableDataSource(); 
       });
      }
      else if(this.RoleId==4)
      {
       
        this.booking_service.Get_ForHR(localStorage.getItem('UserId')).subscribe(resvalues => {
          console.log(resvalues);
            this.dataSource_Hr = new MatTableDataSource(resvalues);
           },
           error => 
           {
            this.dataSource_Hr = new MatTableDataSource(); 
           });
      }
  }

  OpenDialogue_status(BookingId,ApprovalStatus)
  {
    // if(ApprovalStatus!=="Approved")
    // {
    const dialogRef = this.dialog.open(ApproverStatusComponent, {
      width: '35%',
      disableClose: true,
      data: {
        url: 'Bookings/ApproveBookings/' + BookingId,
        BookingId: BookingId,
      }
    });
    dialogRef.afterClosed().subscribe(res => {
     
      this.ShowApproveList();
    });
//   }
//   else
//   {
// this.toastr.error("Sorry Can't be Changed, Already Approved")
//   }
  }
}

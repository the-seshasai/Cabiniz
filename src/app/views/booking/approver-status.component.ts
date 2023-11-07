import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment.prod';
import { BookingService } from './Services/booking.service';

@Component({
  selector: 'app-approver-status',
  templateUrl: './approver-status.component.html',
  styleUrls: ['./approver-status.component.css']
})
export class ApproverStatusComponent implements OnInit {
  ApproverStatusForm = this.fb.group({
    BookingId:[''],
    BookingStatus:[''],
  });
  constructor(
    private matDialog: MatDialogRef<ApproverStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private booking_service:BookingService) { 
     
    }

  ngOnInit(): void {
  }
  Post_ApproverStatus()
  {
    this.ApproverStatusForm.get('BookingId').setValue(this.data.BookingId);
    this.ApproverStatusForm.get('BookingStatus').setValue('Approved');
    let ApproveURL=this.data.url +'/Approved'
    this.http.post(environment.serverUrl + ApproveURL, 0).subscribe(
      res => {
        console.log(res);
        this.toastr.success("Approved Successfully..");
        this.matDialog.close(res);
      },
      err => {
        console.log(err);
        this.matDialog.close({ status: 'FAILED', errorMessage: 'Server Error' });
      }
    );
  }

  Post_RejectStatus()
  {
    this.ApproverStatusForm.get('BookingId').setValue(this.data.BookingId);
    this.ApproverStatusForm.get('BookingStatus').setValue('Reject');
    let RejectURL=this.data.url +'/Rejected'
    this.http.post(environment.serverUrl + RejectURL, 0).subscribe(
      res => {
        console.log(res);
        this.toastr.success("Rejected Successfully..");
        this.matDialog.close(res);
      },
      err => {
        console.log(err);
        this.matDialog.close({ status: 'FAILED', errorMessage: 'Server Error' });
      }
    );
  }

}

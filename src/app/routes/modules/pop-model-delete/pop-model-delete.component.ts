import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '@env/environment.prod';


@Component({
  selector: 'app-pop-model-delete',
  templateUrl: './pop-model-delete.component.html',
  styleUrls: ['./pop-model-delete.component.scss']
})
export class PopModelDeleteComponent implements OnInit {

  constructor(private matDialog: MatDialogRef<PopModelDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private toastr:ToastrService) { }

    deleteItem() {
      debugger;
      this.http.post(environment.serverUrl + this.data.url, 0).subscribe(
        res => {
          console.log(res);
          this.matDialog.close(res);
        },
        err => {
          console.log(err);
          this.matDialog.close({ status: 'FAILED', errorMessage: 'Server Error' });
        }
      );
  
    }
  ngOnInit(): void {
  }

}

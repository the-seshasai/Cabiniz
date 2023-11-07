import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { TableUtil } from '../tableUtil';
import { CompanyService } from 'app/views/company/company.service';
import { Company_interface } from 'app/routes/modules/roleaccess.service';
import { Floor_Interface, GetLocation, MasterService, meeting_interface } from '../master.service';
import { PopModelDeleteComponent } from 'app/routes/modules/pop-model-delete/pop-model-delete.component';

@Component({
  selector: 'app-meeting-room-masterlist',
  templateUrl: './meeting-room-masterlist.component.html',
  styleUrls: ['./meeting-room-masterlist.component.scss']
})
export class MeetingRoomMasterlistComponent implements OnInit {
  selected=0;
  selected1=0;
  selected2=0;
  searchText = new FormControl('');
  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  Company_List: Array<Company_interface>;
  Location_List: Array<GetLocation>;
  Floor_List: Array<Floor_Interface>;
  Meetingcount=0;
  isLoading=true;
  displayedColumns = ['MRMCode','MRMNo','MRMName','TariffPerDay','AvailableSlot','MRMEffDate','Actions'];
  dataSource = new MatTableDataSource<meeting_interface>();
  TodayDate=new Date();

  curmonth = (new Date().getMonth());
  curyear=(new Date().getFullYear());
  curdate=(new Date().getDate());
  E_maxDate = new Date(this.curyear, this.curmonth, this.curdate+7);


  AddMeetinglistForm = this.fb.group({
    
    FloorId: [''],
    CompId: [''],
    LocId: [''],
  });

  constructor( private router:ActivatedRoute,
    private _Router: Router,
    private fb:FormBuilder,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private Company_service:CompanyService,
    private masterservice:MasterService,
    ) { 
      
    }

  ngOnInit() {
    this.searchText.valueChanges.pipe(debounceTime(500)).subscribe(val => {
      this.dataSource.filter = val.trim().toLowerCase();
      
    });
    this.Company_service.Get_CompanyList().subscribe(res => {
      console.log(res);
      this.Company_List = res;
    });
    this.AddMeetinglistForm.get('CompId').setValue(1);
    this.AddMeetinglistForm.get('LocId').setValue(1);
    this.AddMeetinglistForm.get('FloorId').setValue(1);
    this.Getlocation(1);
    this.GetFloor(1);
    this.GetMeetinglist(1);
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


  GetMeetinglist(Floorid:number)
  {
    
   debugger;
    this.masterservice.getMR_byfloorid(Floorid).subscribe(res => {
      console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.Meetingcount = this.dataSource.filteredData.length;
        this.isLoading = false;
       },
       error => 
       {
        //  alert('Cubicles not available for this floor.'); 
        this.dataSource = new MatTableDataSource();
          this.isLoading = false;
          this.Meetingcount=0;
          this.dataSource.paginator.length=0;
       }
    );
  
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

    if (this.paginator) {
      this.applyFilter('');
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
}



    // Export excel funcation

ExportTOExcel()
{
  const onlyNameAndSymbolArr: Partial<meeting_interface>[] = this.dataSource.data.map(x => ({
    MRMCode: x.MRMCode,
    MRMNo: x.MRMNo,
    MRMName: x.MRMName,
    TariffPerDay: x.TariffPerDay,
    AvailableSlot: x.AvailableSlot,
    CreatedBy: x.CreatedBy,
    CreatedOn: x.CreatedOn,
  }));

  TableUtil.exportArrayToExcel(onlyNameAndSymbolArr, "MeetingRoom Details");
  
}

openDialog(MRMId: string): void {
  const dialogRef = this.dialog.open(PopModelDeleteComponent, {
    width: '450px',
    data: {
      url: 'MeetingRoomMaster/DeleteMeetingRoom/' + MRMId,
      MRMId: MRMId
    }
  });
  dialogRef.afterClosed().subscribe(res => {
    if (res) {
      if (res === "MeetingRoom deleted.") {
        // this.Get_AppointmentList();
        this.toastr.error('Server Error');
       } else {
         
         this.toastr.success('Successfully Deleted');
         this.Getlocation(1);
    this.GetFloor(1);
    this.GetMeetinglist(1);
       }
    }
  });
}

}




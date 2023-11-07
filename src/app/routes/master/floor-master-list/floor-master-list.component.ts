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
import { Floor_Interface, GetLocation, MasterService } from '../master.service';
import { PopModelDeleteComponent } from 'app/routes/modules/pop-model-delete/pop-model-delete.component';


@Component({
  selector: 'app-floor-master-list',
  templateUrl: './floor-master-list.component.html',
  styleUrls: ['./floor-master-list.component.scss']
})
export class FloorMasterListComponent implements OnInit {
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
  Floorcount=0;
  isLoading=true;
  displayedColumns = ['FloorCode','FloorName','FlrEffDate','Actions'];
  dataSource = new MatTableDataSource<Floor_Interface>();
  TodayDate=new Date();

  curmonth = (new Date().getMonth());
  curyear=(new Date().getFullYear());
  curdate=(new Date().getDate());
  E_maxDate = new Date(this.curyear, this.curmonth, this.curdate+7);

  AddFloorlistForm = this.fb.group({
    
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
    this.AddFloorlistForm.get('CompId').setValue(1);
    this.AddFloorlistForm.get('LocId').setValue(1);
   
    this.Getlocation(1);
   
    this.GetFloorlist(1);
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

  GetFloorlist(location:number)
  {
    
   debugger;
    this.masterservice.GetFloors_bylocationid(location).subscribe(res => {
      console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.Floorcount = this.dataSource.filteredData.length;
        this.isLoading = false;
       },
       error => 
       {
        //  alert('Cubicles not available for this floor.'); 
        this.dataSource = new MatTableDataSource();
          this.isLoading = false;
          this.Floorcount=0;
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
  const onlyNameAndSymbolArr: Partial<Floor_Interface>[] = this.dataSource.data.map(x => ({
     FloorCode:(x.FloorCode),
     FloorName:(x.FloorName),
     CreatedBy:(x.CreatedBy),
     CreatedOn:(x.CreatedOn),
  }));

  TableUtil.exportArrayToExcel(onlyNameAndSymbolArr, "Floor Details");
  
}


openDialog(floorId: string): void {
  const dialogRef = this.dialog.open(PopModelDeleteComponent, {
    width: '450px',
    data: {
      url: 'Floor/DeleteFloor/' + floorId,
      floorId: floorId
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
         this.GetFloorlist(1);
       }
    }
  });
}

}



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
import { cubicle_interface, Floor_Interface, GetLocation, MasterService } from '../master.service';
import { PopModelDeleteComponent } from 'app/routes/modules/pop-model-delete/pop-model-delete.component';

@Component({
  selector: 'app-cubicle-master-list',
  templateUrl: './cubicle-master-list.component.html',
  styleUrls: ['./cubicle-master-list.component.scss']
})
export class CubicleMasterListComponent implements OnInit {
  selected=0;
  selected1=0;
  selected2=0;

  searchText = new FormControl('');
  // FloorId=new FormControl('');
  // CompId=new FormControl('');
  // LocId=new FormControl('');

  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  
  Company_List: Array<Company_interface>;
  Location_List: Array<GetLocation>;
  Floor_List: Array<Floor_Interface>;

  cubiclecount=0;
  isLoading=true;
  displayedColumns = ['CubicleCode','CubicleNo','CubicleName','TariffPerDay','AvailableSlot','CubEffDate','Actions'];
  dataSource = new MatTableDataSource<cubicle_interface>();
  TodayDate=new Date();

  curmonth = (new Date().getMonth());
  curyear=(new Date().getFullYear());
  curdate=(new Date().getDate());
  E_maxDate = new Date(this.curyear, this.curmonth, this.curdate+7);

  addCubiclelistForm = this.fb.group({
    // AppointmentDate: [''],
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
    this.Company_service.Get_CompanyList().subscribe(res => {
      console.log(res);
      this.Company_List = res;
    });

    this.searchText.valueChanges.pipe(debounceTime(500)).subscribe(val => {
      this.dataSource.filter = val.trim().toLowerCase();
      
    });

    this.addCubiclelistForm.get('CompId').setValue(1);
    this.addCubiclelistForm.get('LocId').setValue(1);
    this.addCubiclelistForm.get('FloorId').setValue(1);
    this.Getlocation(1);
    this.GetFloor(1);
    this.GetCubicle(1);
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

GetCubicle(Floorid:number)
{
 
  this.masterservice.GetCubicles_byFloorid(Floorid).subscribe(res => {
    console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.cubiclecount = this.dataSource.filteredData.length;
      this.isLoading = false;
     },
     error => 
     {
      //  alert('Cubicles not available for this floor.'); 
      this.dataSource = new MatTableDataSource();
        this.isLoading = false;
        this.cubiclecount=0;
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
  const onlyNameAndSymbolArr: Partial<cubicle_interface>[] = this.dataSource.data.map(x => ({
    
    CubicleCode: x.CubicleCode,
    CubicleNo: x.CubicleNo,
    CubicleName: x.CubicleName,
    TariffPerDay: x.TariffPerDay,
    AvailableSlot: x.AvailableSlot,
    CubEffStat: x.CubEffStat,
    CreatedBy: x.CreatedBy,
    CreatedOn: x.CreatedOn,
    
  }));

  TableUtil.exportArrayToExcel(onlyNameAndSymbolArr, "Company Details");
  
}


openDialog(CMId: string): void {
  const dialogRef = this.dialog.open(PopModelDeleteComponent, {
    width: '450px',
    data: {
      url: 'Cubicle/DeleteCubicle/' + CMId,
      CMId: CMId
    }
  });
  dialogRef.afterClosed().subscribe(res => {
    if (res) {
      if (res === "Cubicle deleted.") {
        // this.Get_AppointmentList();
        this.toastr.error('Server Error');
       } else {
         
         this.toastr.success('Successfully Deleted');
         this.Getlocation(1);
    this.GetFloor(1);
    this.GetCubicle(1);
       }
    }
  });
}


}


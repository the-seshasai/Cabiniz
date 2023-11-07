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
import { GetLocation, MasterService } from '../master.service';
import { PopModelDeleteComponent } from 'app/routes/modules/pop-model-delete/pop-model-delete.component';

@Component({
  selector: 'app-company-locationlist',
  templateUrl: './company-locationlist.component.html',
  styleUrls: ['./company-locationlist.component.scss']
})
export class CompanyLocationlistComponent implements OnInit {
  selected=0;
  searchText = new FormControl('');
  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  Company_List: Array<Company_interface>;
  locationCount=0;
  isLoading=true;
  displayedColumns = ['BuildingName','FloorName','LocContactNumber','LocContactPerson','LocEmail','Actions'];
  dataSource = new MatTableDataSource<GetLocation>();
  TodayDate=new Date();

  curmonth = (new Date().getMonth());
  curyear=(new Date().getFullYear());
  curdate=(new Date().getDate());
  E_maxDate = new Date(this.curyear, this.curmonth, this.curdate+7);
  AddLocationlistForm = this.fb.group({
    CompId: [''],
  
  });
  constructor( private router:ActivatedRoute,
    private _Router: Router,
    private fb:FormBuilder,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private Company_service:CompanyService,
    private location_service:MasterService
    ) { 
      
    }

  ngOnInit() {
    this.searchText.valueChanges.pipe(debounceTime(500)).subscribe(val => {
      this.dataSource.filter = val.trim().toLowerCase();
      
    });
    this.AddLocationlistForm.get('CompId').setValue(1);
    this.Company_service.Get_CompanyList().subscribe(res => {
      console.log(res);
      this.Company_List = res;
    });
    this.getlocation(1);
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

  getlocation(Comid) {
    
      this.location_service.GetLocation_bycompanyid(Comid).subscribe(res => {
        console.log(res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.locationCount = this.dataSource.filteredData.length;
          this.isLoading = false;
         },
         error => 
         {
          this.dataSource = new MatTableDataSource();
            this.isLoading = false;
            this.locationCount=0;
         }
      );
    }


    // Export excel funcation

ExportTOExcel()
{
  const onlyNameAndSymbolArr: Partial<GetLocation>[] = this.dataSource.data.map(x => ({
    BuildingName: x.BuildingName,
    
     FloorName:(x.FloorName),
     StreetName:(x.StreetName),
     Area:(x.Area),
     City:(x.City),
     District:(x.District ),
     StateUT:(x.StateUT),

     PinCode:(x.PinCode),
     LocEmail:(x.LocEmail),
     LocContactNumber:(x.LocContactNumber),
     LocContactPerson:(x.LocContactPerson),
     
   
     
  }));

  TableUtil.exportArrayToExcel(onlyNameAndSymbolArr, "Location Details");
  
}

openDialog(location: string): void {
  const dialogRef = this.dialog.open(PopModelDeleteComponent, {
    width: '450px',
    data: {
      url: 'api/Location/DeleteLocation/' + location,
      location: location
    }
  });
  dialogRef.afterClosed().subscribe(res => {
    if (res) {
      if (res === "MeetingRoom deleted.") {
        // this.Get_AppointmentList();
        this.toastr.error('Server Error');
       } else {
         
         this.toastr.success('Successfully Deleted');
         
         this.getlocation(1);
         
       }
    }
  });
}
}

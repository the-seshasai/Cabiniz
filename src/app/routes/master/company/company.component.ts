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
import { CompanyService, Company_interface } from './company.service';
import { TableUtil } from '../tableUtil';



@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  searchText = new FormControl('');
  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  CompanyCount=0;
  isLoading=true;
  displayedColumns = ['CompanyName','Website','CompEmail','CompContactNo','CompContactPerson','CompEffDate','CompEffStat','Actions'];
  dataSource = new MatTableDataSource<Company_interface>();
  TodayDate=new Date();

  curmonth = (new Date().getMonth());
  curyear=(new Date().getFullYear());
  curdate=(new Date().getDate());
  E_maxDate = new Date(this.curyear, this.curmonth, this.curdate+7);
  constructor( private router:ActivatedRoute,
    private _Router: Router,
    private fb:FormBuilder,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private Company_service:CompanyService
    ) { 
      
    }

  ngOnInit() {
    this.searchText.valueChanges.pipe(debounceTime(500)).subscribe(val => {
      this.dataSource.filter = val.trim().toLowerCase();
      
    });
    this.getCompany();
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

  getCompany() {
    
      this.Company_service.Get_CompanyList().subscribe(res => {
        console.log(res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.CompanyCount = this.dataSource.filteredData.length;
          this.isLoading = false;
         },
         error => 
         {
          this.dataSource = new MatTableDataSource();
            this.isLoading = true;
            this.CompanyCount=0;
         }
      );
    }


    // Export excel funcation

ExportTOExcel()
{
  const onlyNameAndSymbolArr: Partial<Company_interface>[] = this.dataSource.data.map(x => ({
     Company_Name: x.CompanyName,
    
     CompanyName:(x.CompanyName),
     Website:(x.Website),
     CompEmail:(x.CompEmail),
     CompContactNo:(x.CompContactNo),
     CompContactPerson:(x.CompContactPerson ),
     MaxCapSize:(x.MaxCapSize),
     CorporateId:(x.CorporateId),
     EffectiveCompEffDate_Date: this.datePipe.transform(x.CompEffDate, 'dd-MM-yyyy')
  }));

  TableUtil.exportArrayToExcel(onlyNameAndSymbolArr, "Company Details");
  
}


}


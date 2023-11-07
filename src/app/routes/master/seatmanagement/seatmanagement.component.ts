import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, delay } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Seatmanagemen_Interface, SeatmanagementService } from './seatmanagement.service';
import { of } from 'rxjs';


@Component({
  selector: 'app-seatmanagement',
  templateUrl: './seatmanagement.component.html',
  styleUrls: ['./seatmanagement.component.scss']
})
export class SeatmanagementComponent implements OnInit {

  searchText = new FormControl('');
  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  SeatsCount=0;
  jsonData=[];
  spans = [];
  isLoading=true;
  displayedColumns = ['CompanyName','BuildingName','FloorName','CategoryName','NoofRooms','RoomName','AmenityDescription','Action'];
  dataSource = new MatTableDataSource<Seatmanagemen_Interface>();
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
    private Seatmanagement_service:SeatmanagementService
    ) { 
      
    }

  ngOnInit() {
    this.searchText.valueChanges.pipe(debounceTime(500)).subscribe(val => {
      this.dataSource.filter = val.trim().toLowerCase();
      
    });
    this.GetSeatManagementList();
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


GetSeatManagementList()
{

  
 
    this.Seatmanagement_service.Seatmanagementlist().subscribe(res => {
      // res.sort((a, b) => a.PTMRN.localeCompare(b.PTMRN));
      
      res.forEach(element => {
        of(res).pipe(delay(1000))
        .subscribe(data => {
         this.SeatsCount=data.length;
          this.isLoading = false;
         this.dataSource = new MatTableDataSource(res);
        //  this.jsonData.sort((a, b) => a.PTMRN.localeCompare(b.PTMRN));
         this.jsonData.push(element);
       this.cacheSpan('CompanyName', d => d.CompanyName);
       this.cacheSpan('BuildingName', d => d.CompanyName + d.BuildingName);
       this.cacheSpan('FloorName', d => d.CompanyName + d.BuildingName + d.FloorName);
       this.cacheSpan('CategoryName', d => d.CompanyName + d.BuildingName + d.FloorName+d.CategoryName);
       this.cacheSpan('NoofRooms', d => d.CompanyName + d.BuildingName + d.FloorName+d.CategoryName+d.NoofRooms);
       this.cacheSpan('AmenityDescription', d => d.CompanyName + d.BuildingName + 
       d.FloorName+d.CategoryName+d.NoofRooms+d.AmenityDescription);
       this.cacheSpan('Action', d => d.CompanyName + d.BuildingName + 
       d.FloorName+d.CategoryName+d.NoofRooms+d.AmenityDescription+d.Action);
        }, error => this.isLoading = false);
       
        
      });

    },
    err => {
      console.log(err);
      this.SeatsCount=0;
    }
  
  );

   
}


cacheSpan(key, accessor) {
 
  for (let i = 0; i < this.jsonData.length;) {
    let currentValue = accessor(this.jsonData[i]);
    let count = 1;

    // Iterate through the remaining rows to see how many match
    // the current value as retrieved through the accessor.
    for (let j = i + 1; j < this.jsonData.length; j++) {        
      if (currentValue != accessor(this.jsonData[j])) {
        break;
      }

      count++;
    } 

    if (!this.spans[i]) {
      this.spans[i] = {};
    }

    // Store the number of similar values that were found (the span)
    // and skip i to the next unique row.
    this.spans[i][key] = count;
    i += count;
  }
}

getRowSpan(col, index) {
  return this.spans[index] && this.spans[index][col];
}


    // Export excel funcation



}


import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';


import { AddModuleComponent } from '../add-module/add-module.component';
import { Post_Module, RoleaccessService } from '../roleaccess.service';
import { PopModelDeleteComponent } from '../pop-model-delete/pop-model-delete.component';


@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss']
})
export class ModuleListComponent implements OnInit {
  searchText = new FormControl('');
  ModuleCount=0;
  CompanyCount=0;
  isLoading=true;
  displayedColumns = ['ModName','Actions'];
  dataSource = new MatTableDataSource<Post_Module>();
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
    private role_service:RoleaccessService
    ) { 
      
    }

  ngOnInit() {
    this.searchText.valueChanges.pipe(debounceTime(500)).subscribe(val => {
      this.dataSource.filter = val.trim().toLowerCase();
      
    });
    this.getModule();
  }



  getModule() {
    
      this.role_service.Get_Modulelist().subscribe(res => {
        console.log(res);
          this.dataSource = new MatTableDataSource(res);
          this.ModuleCount = this.dataSource.filteredData.length;
          this.isLoading = false;
         },
         error => 
         {
          this.dataSource = new MatTableDataSource();
            this.isLoading = true;
            this.ModuleCount=0;
         }
      );
    }

    openDialog(id: string): void {
      const dialogRef = this.dialog.open(PopModelDeleteComponent, {
        width: '450px',
       
        data: {
          url: 'Module/DeleteModule/' + id,
          id: id
        }
      });
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          if (res === 'Deleted Successfully') {
           this.getModule();
            this.toastr.success('Successfully Deleted');
          } else {
            this.toastr.error('Server Error');
          }
          
        }
      });
    }


    openDialog_Modules(ModId): void {
      const dialogRef = this.dialog.open(AddModuleComponent, {
        width: '450px',
        height: '280px',
        data: {
         // url: 'master/addroomtype/',
          ModId: ModId
        }
      });
      dialogRef.afterClosed().subscribe(res => {
            this.getModule();
      });
    }

}


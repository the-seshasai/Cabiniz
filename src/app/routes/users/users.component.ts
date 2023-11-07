import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CompanyService, Company_interface, User_Interface } from '../master/company/company.service';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment.prod';

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  selectedFiles:any;
  
  fileInfo: string;
  name = 'This is XLSX TO JSON CONVERTER';
  willDownload = false;
  searchText = new FormControl('');

  AddUserForm = this.fb.group({

    UserProfileList: this.fb.array([
      this.fb.group({
      UserId: [],
      UserCode: [],
      FullName: [],
      ContactNo: [],
      Gender: [],
      UserEmail: [],
      IdProof: [],
      IdNumber: [],
      IdFile: [],
      ManagerEmpCode: [],
      ManagerEmail: [],
      ManagerContactNo: [],
      HREmpCode: [],
      HREmail: [],
      HRContactNo: [],
      UserEffDate: [],
      UserEffStatus: [],
      RoleId: [],
      UserPassword: [],
      CreatedOn: [],
      CreatedBy: [],
      ModifiedOn: [],
      ModifiedBy: [],
      CompId: [],
      })
    ])
  });




  CompanyCount=0;
  isLoading=true;
  displayedColumns = ['UserCode','FullName','ContactNo','Gender','ManagerEmpCode','HREmpCode','Roles','CreatedOn'];
  dataSource = new MatTableDataSource<User_Interface>();
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
    private http: HttpClient,
    private Company_service:CompanyService
    ) { 
      
    }

  ngOnInit() {
    this.searchText.valueChanges.pipe(debounceTime(500)).subscribe(val => {
      this.dataSource.filter = val.trim().toLowerCase();
      
    });
    this.getUser();
  }


  getUser() {
    
      this.Company_service.Get_UserList_Bycompany(localStorage.getItem('CompId')).subscribe(res => {
        console.log(res);
          this.dataSource = new MatTableDataSource(res);
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



    onFileChange(ev,input: HTMLInputElement) {

let flag=0;
      const file1 = input.files[0];
    let File_Name=file1.name;
    var extension = File_Name.substr(File_Name.lastIndexOf('.'));
if ((extension.toLowerCase() == ".xlsx") || (extension.toLowerCase() == ".xls") || (extension.toLowerCase() == ".xlsm"))
{
  this.selectedFiles = ev.target.files;
  function formatBytes(bytes: number): string {
    const UNITS = ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const factor = 1024;
    let index = 0;

    while (bytes >= factor) {
      bytes /= factor;
      index++;
    }

    return `${parseFloat(bytes.toFixed(2))} ${UNITS[index]}`;
  }
 
  this.fileInfo = `${file1.name} (${formatBytes(file1.size)})`;


      let workBook = null;
      let jsonData = null;
      const reader = new FileReader();
      const file = ev.target.files[0];
      reader.onload = (event) => {
        const data = reader.result;
        workBook = XLSX.read(data, { type: 'binary' });
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        const dataString = JSON.stringify(jsonData);
     
        // jsonData.UserProfileList.forEach(element => {
          for (let i = 0; i < jsonData.UserProfileList.length; i++){
         
          jsonData.UserProfileList[i].UserEffStatus='Active';
          jsonData.UserProfileList[i].CompId=localStorage.getItem('CompId');
         
          if( jsonData.UserProfileList[i].UserCode!=undefined)
          {
            flag=1;
          }
          else
          {
            this.toastr.error('Usercode should not Empty');
            flag=0;
            return false;
          }
          if( jsonData.UserProfileList[i].FullName!=undefined)
          {
            flag=1;
          }
          else
          {
            this.toastr.error('FullName should not Empty');
            flag=0;
            return false;
          }
          if( jsonData.UserProfileList[i].ContactNo!=undefined)
          {
            flag=1;
            
          }
          else
          {
            this.toastr.error('ContactNo should not Empty');
            flag=0;
            return false;
          }
          if( jsonData.UserProfileList[i].Gender!=undefined)
          {
            flag=1;
          }
          else
          {
            this.toastr.error('Gender should not Empty');
            flag=0;
            return false;
          }
          if( jsonData.UserProfileList[i].UserEmail!=undefined)
          {
            flag=1;
          }
          else
          {
            this.toastr.error('UserEmail should not Empty');
            flag=0;
            return false;
          }
          
          if( jsonData.UserProfileList[i].RoleId!=undefined)
          {
            flag=1;
          }
          else
          {
            
            
            this.toastr.error('RoleId should not Empty');
            flag=0;
            
            return false;
          }
        
          }

        if(flag==1)
        {
           this.Company_service.postUser(jsonData).subscribe(res => {
             console.log(res);
             this.toastr.success('Successfully Saved');
             
             this.getUser();
           });
        
        }
        else
        {
          this.toastr.error("File not uploaded");
        }
       debugger;
    
      }
    
      reader.readAsBinaryString(file);
 
     
    
    }
    else
    {
    this.toastr.error("Allow to upload .xlsx, .xls and xlsm  files");
}
    
       
  
        
    
      }
  
   
}


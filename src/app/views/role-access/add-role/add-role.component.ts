import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Company_interface, Post_Module, RoleAccessService, Role_interface } from '../role-access.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
  Company_List: Array<Company_interface>;
  Role_List: Array<Role_interface>;
  RoleId:number;
  role_count=0;
  GetListcount=0;
  RoleChkbox=0;
  currentSelected=0;
  selected=0;
  selected1=0;
  selectedFeatures: any = [];
  RoleAccessForm = this.fb.group({
    Company:['',Validators.required],
    role:['',Validators.required],
    AccessList: this.fb.array([
      this.fb.group({
      ModAccId: [],
      CompId: [],
      RoleId: [],
      ModId: [],
      
      
      }) 
    ]),
  });

  constructor(private router:ActivatedRoute,
    private _Router: Router,
    private fb:FormBuilder,
    private toastr:ToastrService,
    private datePipe: DatePipe,
    private role_service:RoleAccessService) { 
    }

    displayedColumns = ['select','ModName'];
    dataSource= new MatTableDataSource<Post_Module>();
  ngOnInit(): void {
     
    this.role_service.Get_CompanyList().subscribe(res => {
      console.log(res);
      this.Company_List = res;

    });

    this.role_service.Get_Role().subscribe(res1 => {
      console.log(res1);
      this.Role_List = res1;

    });

 
  }



  get AccessList_Control() {
    return this.RoleAccessForm.get('AccessList') as FormArray;
  }
  GetList(getvalue)
  {
    this.RoleId=parseInt(localStorage.getItem('roleId'));

    this.role_service.Get_Modulelist()
    .subscribe(res => {
      console.log(res);
 this.dataSource=new MatTableDataSource(res);
 this.GetListcount=res.length;
 this.role_count=res.length;
     
    },
    error=>
    this.role_count=0
    );


  }

  onChange(event,ModId,row) {   
    
    if(event.checked)
    {
       this.selectedFeatures.push(ModId);
       console.log( this.selectedFeatures);   
    }
    else{
      const index =row;
      if (index > -1) {
        this.selectedFeatures.splice(index, 1);
        console.log( this.selectedFeatures);  
      }
      
    }
  }


  Post_roleAcess()
  {
    debugger;
         const AccessControls = <FormArray>this.AccessList_Control;
        for (let i = AccessControls.length - 1; i >= 0; i--) {
         AccessControls.removeAt(0);
       }
        
    let comid=this.RoleAccessForm.get('Company').value;
    let roelId=this.RoleAccessForm.get('role').value;
   
      if(this.selectedFeatures.length>=1)
      {
      this.selectedFeatures.forEach(element => {
        this.AccessList_Control.push(
          this.fb.group({              
            ModAccId: [0],
            CompId: [comid],
            RoleId: [roelId],
             ModId: [element],
                  
          })          
        ); 
      });
    }   
      if (this.RoleAccessForm.valid) {
      console.log(this.RoleAccessForm.value);
    this.role_service.Post_MenuAccess(this.RoleAccessForm.value).subscribe(res => {
     
        this.toastr.success('successfully Saved');
    });
  }
  }
}


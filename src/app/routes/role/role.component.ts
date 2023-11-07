import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { Company_interface, ModuleByCompanyList_interface, Post_Module, RoleaccessService, Role_interface } from '../roleaccess.service';
import { MenuService } from '@core';
import { SelectionModel } from '@angular/cdk/collections';
import { Company_interface, ModuleByCompanyList_interface, RoleaccessService, Role_interface } from '../modules/roleaccess.service';

interface myarray
{
  select : boolean; 
};

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  select:any;
  CompanyId:number;
  RoleId_drop:number;
  items: myarray[];
  Company_List: Array<Company_interface>;
  Role_List: Array<Role_interface>;
  RoleId:number;
  role_count=0;
  GetListcount=0;
  RoleChkbox=0;
  currentSelected=0;
  selected=0;
  companyname:string;
  selected1=0;
  selectedFeatures: any = [];
  tempselectedFeatures: any = [];
  RoleAccessForm = this.fb.group({
    Company:['',Validators.required],
    Company1:['',Validators.required],
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
    private _menu: MenuService,
    private role_service:RoleaccessService) { 
    }

    displayedColumns = ['select','ModName'];
    dataSource= new MatTableDataSource<ModuleByCompanyList_interface>();
    selection = new SelectionModel<ModuleByCompanyList_interface>(true, []);
  ngOnInit(): void {
    this.role_service.Get_CompanyList().subscribe(res => {
       res.filter(ele=>
        {
         if(ele.CompId===parseInt(localStorage.getItem('CompId')))
         {
          this.RoleAccessForm.get('Company1').setValue(ele.CompanyName);
          this.RoleAccessForm.get('Company').setValue(ele.CompId);
              if(this.RoleAccessForm.get('Company').value!='')
              {
                
              this.GetList(this.RoleAccessForm.get('Company').value);
              }
         }
        });

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
    this.CompanyId=getvalue;
    this.RoleId=parseInt(localStorage.getItem('roleId'));

    // this.role_service.Get_Modulelist()
    this.role_service.Get_ModulelistBy_company(getvalue)
    .subscribe(res_allmodule => {
   
 this.dataSource=new MatTableDataSource(res_allmodule);
 this.GetListcount=res_allmodule.length;
 this.role_count=res_allmodule.length;
console.log(res_allmodule);
//  for(let i=0;i<res_allmodule.length;i++)
//  {
//   this.selectedFeatures.push(res_allmodule[i].MenuId);
//        console.log( 'true ' + this.selectedFeatures);   
//  }

    },
    error=>
    {
    this.role_count=0,
    this.dataSource=new MatTableDataSource()
    }
    );

 
  }

  CheckList(value)
  {
    this.RoleId_drop=value;
    this.role_service.Get_ModulelistBy_company(this.CompanyId)
    .subscribe(res_allmodule => {
      debugger;


      if(this.selectedFeatures.length>0)
      {
      for(let k=0;k<this.selectedFeatures.length;k++)
      {
        
        this.selectedFeatures=[];
      }
    }

      for(let i=0;i<res_allmodule.length;i++)
        {
          // this.selectedFeatures.push(res_allmodule[i].ModId); 
          this.dataSource.data[i].select=false;
        }
      
   
    
      this._menu.Get_MenuList(this.CompanyId,value).subscribe(res_rolebased => {
       
        console.log(res_allmodule);
        this.select=[];
        for(let i=0;i<res_allmodule.length;i++)
        {                
          for(let j=0;j<res_rolebased.length;j++)
          {
            if(res_allmodule[i].ModName===res_rolebased[j].ModName)
            {
              
            this.dataSource.data[i].select=true;
            //  this.selectedFeatures.push(res_allmodule[i].ModId); 
              this.selectedFeatures.splice(i,0,res_rolebased[j].ModId);    
           
            }
           
            // console.log(i +'-' + this.selectedFeatures);
          }
        }
    },
    error=>
   console.log('No Modules selected for this company or role'),
    );

    },
    
    error=>
    {
   
    this.role_count=0
    }
    );

   
  }

  onChange(event,MenuId,row) {   

   
    if(event.checked)
    {
    // debugger;
   
       this.selectedFeatures.push(MenuId);
       console.log( 'true ' + this.selectedFeatures);   
    }
    else{
      // debugger;
      // const index =row;
      
      // if (index > -1) {
      //   this.selectedFeatures.splice(index, 1);
      //   console.log('else ' + this.selectedFeatures);  
      // }


          var index = this.selectedFeatures.indexOf(MenuId);
         
          if (index >= 0) {
         this.selectedFeatures.splice( index, 1 );
         console.log('else ' + this.selectedFeatures);  
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


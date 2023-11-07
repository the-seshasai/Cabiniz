import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

export interface Post_Module
{
  ModId: number;
  ModName: string;
}
export interface Module_interface
{
  ModAccId: number;
  CompId: number;
  RoleId: number;
  ModId: number;
  ModName: string;
  CompanyName: string;
}


export interface Company_interface
{
  CompId: number;
    CompanyName: string;
    Website: string;
    CompEmail:  string;
    CompContactNo:  string;
    CompContactPerson: string;
    CompEffDate: string;
    CompEffStat:  string;
    CreatedOn:  string;
    CreatedBy:  string;
    ModifiedOn:  string;
    ModifiedBy:  string;
    ContEmpId:  string;
    MaxCapSize:  string;
}
export interface RoleList_interface
{
  ModAccId: number;
  CompId: number;
  RoleId:number;
  ModId: number;
  ModName: string;
  CompanyName: string;
  Roles:string;
}
export interface Post_menuAccess
{
  AccessList: [
    {
      ModAccId: number;
      CompId: number;
      RoleId:number;
      ModId:number;
    
    }
  ];
}

export interface Role_interface
{
  RId: number;
  RoleId:number;
  Roles: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoleAccessService {

  constructor(private http: HttpClient) { }

  
  Get_Modulelist()
  {
    return this.http.get<Array<Post_Module>>(environment.serverUrl + 'User/GetModules');
  }


  Get_Role()
  {
    return this.http.get<Array<Role_interface>>(environment.serverUrl + 'User/Roles');
  }

  post_Module(res: Post_Module) {
    const data = {
      ...res,
      status: true,
      CreatedBy:localStorage.getItem('username'),
      
    };
    console.log(res);
    return this.http.post(environment.serverUrl + 'Module/SaveModule', data);
  }

  
  Get_CompanyList()
  {
    return this.http.get<Array<Company_interface>>(environment.serverUrl + 'Company/GetCompany');
  }
  // Get_roleList(getvalue,RoleId)
  // {
  //   return this.http.get<Array<RoleList_interface>>(environment.serverUrl + 'User/GetModuleAccess/' + getvalue + '/'+ RoleId);
  // }

  Post_MenuAccess(res: Post_menuAccess) {
    const data = {
      ...res,
      status: true,
      CreatedBy:localStorage.getItem('username'),
      
    };
    console.log(res);
    return this.http.post(environment.serverUrl + 'Module/ProvideAccess', data);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment.prod';
import { Observable } from 'rxjs';


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
    CorporateId:string;
    CompanyType:any;
}

export interface Post_MenuAccess{
  MenuAccessLst: [
    {
      MAId: number;
      CompId: number;
      RoleId:number;
      MenuId:number;
      select:boolean;
    }
  ];
}

export interface User_Interface
{
 
        UserId: number;
        UserCode: string;
        FullName: string;
        ContactNo: string;
        Gender: string;
        UserEmail: string;
        IdProof: string;
        IdNumber: string;
        IdFile: string;
        ManagerEmpCode: string;
        ManagerEmail: string;
        ManagerContactNo: string;
        HREmpCode: string;
        HREmail: string;
        HRContactNo: string;
        UserEffDate:  string;
        UserEffStatus: string;
        RoleId: number;
        UserPassword: string;
        CreatedOn:  string;
        CreatedBy: string;
        ModifiedOn:  string;
        ModifiedBy: string;
        CompId: number;
    
}

export interface UserSave
{
  UserProfileList: [
    {
      UserId: number;
      UserCode: string;
      FullName: string;
      ContactNo: string;
      Gender: string;
      UserEmail: string;
      IdProof: string;
      IdNumber: string;
      IdFile: string;
      ManagerEmpCode: string;
      ManagerEmail: string;
      ManagerContactNo: string;
      HREmpCode: string;
      HREmail: string;
      HRContactNo: string;
      UserEffDate:  string;
      UserEffStatus: string;
      RoleId: number;
      UserPassword: string;
      CreatedOn:  string;
      CreatedBy: string;
      ModifiedOn:  string;
      ModifiedBy: string;
      CompId: number;
    }
  ];
}

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  Get_CompanyList()
  {
    return this.http.get<Array<Company_interface>>(environment.serverUrl + 'Company/GetCompany');
  }

  Get_UserList()
  {
    return this.http.get<Array<User_Interface>>(environment.serverUrl + 'User/GetUsers');
  }

  Get_UserList_Bycompany(company)
  {
    return this.http.get<Array<User_Interface>>(environment.serverUrl + 'User/GetUsersByCompany' + "/" + company);
  }



  postCompnay(res: Company_interface) {
    const data = {
      ...res,
      status: true,
      CreatedBy:localStorage.getItem('username'),
      
    };
    console.log(res);
    return this.http.post(environment.serverUrl + 'Company/SaveCompany', data);
  }


  Post_Menucompany(res: Post_MenuAccess) {
    const data = {
      ...res,
      status: true,
      CreatedBy:localStorage.getItem('username'),
      
    };
    console.log(res);
    return this.http.post(environment.serverUrl + 'Company/SaveCompanyMenuAccess', data);
  } 

  putCompany(res: Company_interface) {
    const data = {
      ...res,
      status: true,
      ModifiedBy:localStorage.getItem('username'),
      
    };
    console.log(res);
    return this.http.post(environment.serverUrl + 'Company/EditCompany' , data);
    
  }
  Get_CompanyByCode(ByComId)
  {
      return this.http.get<Array<Company_interface>>(environment.serverUrl + 'Company/GetCompanyById/' + ByComId);
  }

  Get_GetCorporateId()
  {
    return this.http.get(environment.serverUrl + 'Company/GetCorporateId');
  }

  GetLocationPhotos()
  {
    return this.http.get(environment.serverUrl + 'Location/GetLocationPhotos/1');
  }

  postUser(UserInterface:UserSave): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(UserInterface);
      console.log(UserInterface);
     return this.http.post(environment.serverUrl + 'Users/SaveUser', body,{'headers':headers})
  }

}

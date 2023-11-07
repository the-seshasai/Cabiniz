import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

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


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  Get_CompanyList()
  {
    return this.http.get<Array<Company_interface>>(environment.serverUrl + 'Company/GetCompany');
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
}

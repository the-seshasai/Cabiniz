import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { share, switchMap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';


const TOKEN_KEY = 'jwt';

interface LoginReq {
    username: string;
    password: string;
}
interface ChangePassReq {
  userId: string;
  oldPassword: string;
  password: string;
}

interface LoginRes {
//   Id:number;
  UserCode:string;
  FullName:string;
  ContactNo: number;
  Gender: string;
  UserEmail:string;
  IdProof: string;
  IdNumber: string;
  IdFile: string;
  ManagerEmpCode: string;
  ManagerEmail: string;
  ManagerContactNo: string;
  HREmpCode: string;
  HREmail: string;
  HRContactNo: string;
  UserEffDate: string;
  UserEffStatus: string;
  RoleId: number;
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  loginStatus = false;
  UserCode: string;
  FullName: string;
  ContactNo: string;
  Gender: string;
  UserEmail: string;
  RoleId: string;
  
  private _change$ = new BehaviorSubject(null);



  constructor(
    private http: HttpClient,) {}



  login(resource: LoginReq) {
    debugger;
   
    return this.http.get<LoginRes>(environment.serverUrl + 'User/Authenticate/' + resource.username + "/" + resource.password).pipe(
      switchMap(res => { 
        console.log("Login *********************")     
        console.log(res);
        if (res) {
          this.loginStatus = true;
          this.FullName = res[0].FullName;        
          this.RoleId = res[0].RoleId;
          this.UserCode = res[0].UserCode;
      
         
          localStorage.setItem('username', this.FullName);
          localStorage.setItem('roleId', this.RoleId);
          localStorage.setItem('UserId', this.UserCode);
   
          
          
          return of({ status: true, GetRoleId:parseInt(this.RoleId) });
        } else {
          return of({  status: false,GetRoleId:parseInt(this.RoleId)});
        }
      }),
      catchError(err => {
        return of({ msg: err, status: false,GetRoleId:parseInt(this.RoleId) });
      })
    );
  }

}


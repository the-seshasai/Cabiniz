import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, share, switchMap } from 'rxjs/operators';

import { LocalStorageService } from '@shared/services/storage.service';
import { TokenModel, AuthReferrer } from './interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment.prod';
import { FormGroup } from '@angular/forms';

const TOKEN_KEY = 'jwt';

interface LoginReq {
  UserName: string;
  UserPassword: string;
}

interface LoginReq_corporate {
  UserName: string;
  UserPassword: string;
  CorpId:string;
}

interface Login_corporate{
  CorpId:string;
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
CompId:string;
}

interface Mobilelogin {
UserId: any;
UserCode: any;
Name: any;
MobileNo: any;
MobileOTP: any;
Gender:any;
Email: any;
CorporateId: any;
Role: any;

}


interface Sigin_interface
{
 CorporateId:any;
 Name:any;
 MobileNo:any;
 Email:any;
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
  CompId:string;
  private _change$ = new BehaviorSubject(null);

  private _referrer: AuthReferrer = {};

  constructor(private _store: LocalStorageService, private http: HttpClient) {}

  /**
   * The referrer of current page
   */
  get referrer() {
    return this._referrer;
  }

  set(data: TokenModel): boolean {
    this._change$.next(data);
    return this._store.set(TOKEN_KEY, data);
  }

  get<T extends TokenModel>(type?: new () => T): T {
    const data = this._store.get(TOKEN_KEY);
    return type ? (Object.assign(new type(), data) as T) : (data as T);
  }

  clear() {
    this._store.remove(TOKEN_KEY);
  }

  change(): Observable<TokenModel | null> {
    return this._change$.pipe(share());
  }

  login(resource: LoginReq) {
    debugger;
   
    return this.http.get<LoginRes>(environment.serverUrl + 'User/Authenticate/' + resource.UserName + "/" + resource.UserPassword).pipe(
      switchMap(res => { 
        console.log("Login *********************")     
        console.log(res);
        if (res) {
          this.loginStatus = true;
          this.FullName = res[0].Name;        
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


  Mobilelogin(MobileNo:any)
  {
     
    return this.http.get<Mobilelogin>(environment.serverUrl + 'User/AuthenticateUser/' + MobileNo)
  }



  PostSignin(res: Sigin_interface) {
    const data = {
        ...res, 
    };
console.log(res);
return this.http.post(environment.serverUrl + 'User/Signup' , data);

}


  Corporate_validate(resource: Login_corporate) {
    // return this.http.get(environment.serverUrl + 'User/ValidateCorporateId/' + resource.CorpId);
    return this.http.get(environment.serverUrl + 'User/ValidateCorporateId/' + resource.CorpId).pipe(
      switchMap(res => { 
        debugger;
        console.log("****************");
       console.log(res);

       this.FullName = res[0].Name;        
       this.RoleId = res[0].RoleId;
       this.UserCode = res[0].UserCode;
   
      
       localStorage.setItem('username', this.FullName);

        if (res=='Company doest not exist') {
          return of({ status: true, Company:'Company doest not exist' });
        } else {
          return of({  status: false,Company:'Company Exist'});
        }
      }),
      catchError(err => {
        return of({ msg: err, status: false,Company:'Company doest not exist'});
      })
    );
  }


  CorporateBase_login(resource: LoginReq_corporate) {
    debugger;
   
    return this.http.get<LoginRes>(environment.serverUrl + 'User/AuthenticateCorpId/' + resource.UserName + "/" + resource.UserPassword + "/" + resource.CorpId).pipe(
      switchMap(res => { 
        console.log("Login *********************")     
        console.log(res);
        if (res) {
          this.loginStatus = true;
          this.FullName = res[0].Name;        
          this.RoleId = res[0].RoleId;
          this.UserCode = res[0].UserCode;
           this.CompId=res[0].CompId;
         
          localStorage.setItem('username', this.FullName);
          localStorage.setItem('roleId', this.RoleId);
          localStorage.setItem('UserId', this.UserCode);
          localStorage.setItem('CompId', this.CompId);
   
          
          
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

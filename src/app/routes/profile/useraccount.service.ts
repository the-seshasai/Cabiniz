import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment.prod';


export interface POst_changePassword
{
  username:string;
  newpassword:string;
  confirmpassword:string;
}

export interface Post_forgot
{
  UserCode:string;
  UserEmail:string;
  
}

@Injectable({
  providedIn: 'root'
})
export class UseraccountService {

  constructor(private http: HttpClient) { }

  PostChange_Password(res: POst_changePassword) {

    let data='User/ChangePassword/'+ res.username +'/'+ res.newpassword +'/'+ res.confirmpassword; 
    console.log(data);
    return this.http.post(environment.serverUrl + data , 0 );
  }
  Post_forgot(res: Post_forgot)
  {
    const data = {
      ...res,
    };
    console.log(data);
    return this.http.post(environment.serverUrl + 'User/ForgotPassword/', data);
  }
}

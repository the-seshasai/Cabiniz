import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TokenService, StartupService, SettingsService } from '@core';
import { PopDialogCityComponent } from 'app/routes/workspacebooking/pop-dialog-city/pop-dialog-city.component';

import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // styleUrls: ['./login.component.scss']
  styles         : [
    `

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    
    /* Firefox */
    input[type=number] {
      -moz-appearance: textfield;
    }


    .container {
      display: flex;
      flex-flow: column;
      height: 100%;
      align-items: space-around;
      justify-content: center;
    }
    .userInput {
      display: flex;
      justify-content: center;
    }


    .center {
      text-align: center;
      
    }


    `
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginsubmitted = false;
  RoleId=0;
  EmpCode=0;
  disableButton = false;
  selected2=0;
  FlagCorpid=0;

  VerfiyOTP:any;

  ShowMobileNo=1;
  ShowOTP=0;
  CorpId_List = ['Corporate-Id', 'Individual'];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _token: TokenService,
    private _startup: StartupService,
    private _settings: SettingsService,
    private toastr: ToastrService,
    private authSer: TokenService,
    private dialog: MatDialog,

   
  ) {
    this.loginForm = this.fb.group({
      CorpId_drop:['', [Validators.required]],
      CorpId: [''],
      UserName: ['', [Validators.required]],
      UserPassword: ['', [Validators.required]],

    });


    // this.loginForm = this.fb.group({
    //    MobileNo:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    //    ist:[''],
    //    sec:[''],
    //    third:[''],
    //    fourth:[''],
    //    fifth:[''],
    //    sixth:[''],

    // });
  }

  ngOnInit() {
   
   
  }

  SelectCorpId(Getcorpid)
  {
if(Getcorpid==='Corporate-Id')
{
  this.FlagCorpid=1;
}
else
{
  this.FlagCorpid=0;
}
  }


  formHasError(controlName: string, errorName: string) {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  get username() {
    return this.loginForm.get('UserName');
  }

  get CorpId() {
    return this.loginForm.get('CorpId');
  }

  get password() {
    return this.loginForm.get('UserPassword');
  }

  Mobilelogin() {

let MobileNo = this.loginForm.get('MobileNo').value;


//  debugger;
  if (this.loginForm.valid) {


    this.authSer.Mobilelogin(MobileNo).subscribe(res => { 
      console.log(res);
    
      // Check if the response is an empty array
      if (Array.isArray(res) && res.length === 0) {
        this.toastr.error('Login failed');

        // this.ShowMobileNo=1;


          this.router.navigateByUrl('/auth/sign-in');
       


      


      } else {

       
        
        this.toastr.success('Login Success');
        this.VerfiyOTP=res[0].MobileOTP;


                 
        this.ShowMobileNo=0;
        this.ShowOTP=1;

       

    
      }
    });


 
  }

    
  }



  VerifyOtp()
  {

    let CheckOTP= this.loginForm.get('ist').value + this.loginForm.get('sec').value + this.loginForm.get('third').value + 
                  this.loginForm.get('fourth').value + this.loginForm.get('fifth').value + this.loginForm.get('sixth').value

                  debugger;
                if(CheckOTP==this.VerfiyOTP)
                {

                  const { token, username, uid } = { token: 'workspace-token', uid: 1, username: '' };           
        this._settings.setUser({ id: uid, name: username, avatar: '' });           
        this._token.set({ token, uid, username });           
        this._startup.load().then(() => {
          let url = this._token.referrer!.url || '/';
          if (url.includes('/auth')) {
            url = '/';
          }

            this.router.navigateByUrl('/dashboard');

        });

                }
                else
                {

                  this.toastr.error('Invaild OTP');
                  this.router.navigateByUrl('/auth/login');

                }
 
 }

  login() {

    // const { token, username, uid } = { token: 'ng-matero-token', uid: 1, username: 'ng-matero' };
    // // Set user info
    // this._settings.setUser({ id: uid, name: username, avatar: '' });
    // // Set token info
    // this._token.set({ token, uid, username });
    // // Regain the initial data
    // this._startup.load().then(() => {
    //   let url = this._token.referrer!.url || '/';
    //   if (url.includes('/auth')) {
    //     url = '/';
    //   }
    //   this.router.navigateByUrl(url);
    // });
  
    try {
      this.loginsubmitted = true;
      
      if (this.loginForm.invalid) {
        return;
      }
    //  debugger;
      if (this.loginForm.valid) {

        if(this.FlagCorpid==1)
        {
          if(this.loginForm.get('CorpId').value !='')
          {
            this.disableButton=true;
debugger;
            this.authSer.Corporate_validate(this.loginForm.value).subscribe(Corporate_validate => { 
             console.log(Corporate_validate.Company);
              if(Corporate_validate.Company==="Company Exist")
              {
                this.authSer.CorporateBase_login(this.loginForm.value).subscribe(res => {    
                   
                  if (res.status) {
                    const { token, username, uid } = { token: 'workspace-token', uid: 1, username: '' };           
                    this._settings.setUser({ id: uid, name: username, avatar: '' });           
                    this._token.set({ token, uid, username });           
                    this._startup.load().then(() => {
                      let url = this._token.referrer!.url || '/';
                      if (url.includes('/auth')) {
                        url = '/';
                      }
                      let Id_OfRole=res.GetRoleId;
                      if(Id_OfRole==1)
                      {
                        // this.router.navigateByUrl('/booking/approver-dashboard');
                        this.router.navigateByUrl('/dashboard');
                       
                      }
                               else 
                                {
                          //  this.router.navigateByUrl('/workspacebooking/landingpage');
                          this.router.navigateByUrl('/dashboard');
                        // setTimeout (() => {
                        //   this.OpenDialogue_City();
                        // }, 1000);
                      }   
                    });
                 
                    this.toastr.success('Login Success');
                  } else {
                    this.toastr.error('Login Failed');
                    this.disableButton=false;
                  }
                });
              }
              else
              {
                this.toastr.error("CorporateId doest not exist!!!");
                this.disableButton=false;
              }

            });
           
          }
          else
          {
            this.toastr.error("Please enter Corporate-Id...");
          }
        }
        else
        {
          this.disableButton=true;
            this.authSer.login(this.loginForm.value).subscribe(res => {    
                   
              if (res.status) {
                const { token, username, uid } = { token: 'workspace-token', uid: 1, username: '' };           
                this._settings.setUser({ id: uid, name: username, avatar: '' });           
                this._token.set({ token, uid, username });           
                this._startup.load().then(() => {
                  let url = this._token.referrer!.url || '/';
                  if (url.includes('/auth')) {
                    url = '/';
                  }
                  let Id_OfRole=res.GetRoleId;
                  if(Id_OfRole==1)
                  {
                    // this.router.navigateByUrl('/booking/approver-dashboard');
                    this.router.navigateByUrl('/dashboard');
                   
                  }
                           else 
                            {
                      //  this.router.navigateByUrl('/workspacebooking/landingpage');
                      this.router.navigateByUrl('/dashboard');
                    // setTimeout (() => {
                    //   this.OpenDialogue_City();
                    // }, 1000);
                  }   
                });
             
                this.toastr.success('Login Success');
              } else {
                this.toastr.error('Login Failed');
                this.disableButton=false;
              }
            });
        }
        
      
      }
    } catch (error) {
      this.toastr.error(error);
    }
  }
 
  

  
  OpenDialogue_City()
  {
    const dialogRef = this.dialog.open(PopDialogCityComponent, {
      width: '30%',
      height:'30%',
      disableClose: true,
      data: {
        //url: 'Booking/GetAppointmentById',
        
      }
    });
    dialogRef.afterClosed().subscribe(res => { 
    });
  }


}

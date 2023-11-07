import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


import { TokenService } from '../../containers/authentication/token.service';
import { PopDialogCityComponent } from '../pop-dialog-city.component';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  loginform = true;
  recoverform = false;

  /*start login parameter*/
  loginForm: FormGroup;
  loginsubmitted = false;
  username: any = '';
  password: any = '';
  /*end login parameter*/

  /*start Forgotpassword parameter*/
  recoverForm: FormGroup;
  recoversubmitted = false;
  EmailId = '';
  RoleId:number;
  /*start Forgotpassword parameter*/

  constructor(
    private fb: FormBuilder,
    private router: Router,
   private toastr: ToastrService,
    private TokenServices:TokenService,
    private dialog: MatDialog,

  ) {}
  emailPattern = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  ngOnInit() {
    this.loginForm = this.fb.group({
      form_userName: [''],
      form_password: ['']
    });
   
  }
  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
    this.recoversubmitted = false;
   
  }

  showLoginForm() {
    this.recoverform = !this.recoverform;
    this.loginsubmitted = false;
    this.onresetlogin();
  }
  /* Check Valid Login User */
  onClicklogin() {
    debugger;
    this.RoleId=parseInt(localStorage.getItem('roleId'));
    try {
      this.loginsubmitted = true;
      if (this.loginForm.valid) {
        const logindto = {
          username: this.loginForm.get('form_userName').value,
          password:this.loginForm.get('form_password').value
        };
        this.TokenServices.login(logindto).subscribe(res => {
          if (res.status) {
            let Id_OfRole=res.GetRoleId;
            
            this.toastr.success('Login Success');
            
   if(Id_OfRole==1)
  {
    // this.router.navigateByUrl('/booking/approver-dashboard');
    this.router.navigateByUrl('/dashboard');
   
  }
           else 
            {
       this.router.navigateByUrl('/booking/location');
    setTimeout (() => {
      this.OpenDialogue_City();
    }, 1000);
  }
  // else if(Id_OfRole==3 || Id_OfRole==4)
  // {
  //   // this.router.navigateByUrl('/booking/approver-dashboard');
  //   this.router.navigateByUrl('/booking/location');
  //   setTimeout (() => {
  //     this.OpenDialogue_City();
  //   }, 1000);
  // }

           
          } 
          else
          {
            this.toastr.error('Login failed'); 
          }
        
        });
      }
    } catch (error) {
      // this.toastr.error(error);
    }
  }
 

  OpenDialogue_City()
  {
    const dialogRef = this.dialog.open(PopDialogCityComponent, {
      width: '30%',
      height:'40%',
      disableClose: true,
      data: {
        //url: 'Booking/GetAppointmentById',
        
      }
    });
    dialogRef.afterClosed().subscribe(res => {
     
      
    });
  }

  onresetlogin() {
    this.username = '';
    this.password = '';
  }



  
 
}

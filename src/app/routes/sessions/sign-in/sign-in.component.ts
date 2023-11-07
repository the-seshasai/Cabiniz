import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService, StartupService, SettingsService } from '@core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {



  emailPattern = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  NamePattern=/^[a-zA-Z_ ]*$/

 SiginForm = this.fb.group({

  CorporateId:[''],
  Name:['',[Validators.required,Validators.pattern(this.NamePattern)]],	
  MobileNo:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
  Email:['', [Validators.required,Validators.pattern(this.emailPattern)]],

  

 });


  constructor(  private fb: FormBuilder,
    private router: Router,
    private _token: TokenService,
    private _startup: StartupService,
    private _settings: SettingsService,
    private toastr: ToastrService,
    private authSer: TokenService,) { }

  ngOnInit(): void {
  }



    // Method to set the CorporateId FormControl value to "INDIVIDUAL"
    setIndividualValue() {
      this.SiginForm.get('CorporateId').setValue('INDIVIDUAL');
    }



    SignIn()
    {

   
      if(this.SiginForm.valid)
      {

        this.authSer.PostSignin(this.SiginForm.value).subscribe(res => { 

if(res== "Saved Successfully")
{
    
  this.toastr.success('Signin Success');

  this.router.navigateByUrl('/auth/login');
}
else
{
  let Result=res;
  this.toastr.error(Result.toString());
}

     
        },error=>{

          this.toastr.error("Company doest not exist");
        });

      }

    }
  formHasError(controlName: string, errorName: string) {
    return this.SiginForm.controls[controlName].hasError(errorName);
  }

}

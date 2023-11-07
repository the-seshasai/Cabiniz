import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UseraccountService } from 'app/routes/profile/useraccount.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  loginForm: FormGroup;
  disableButton = false;
  isLoading :any;
  emailPattern = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  constructor(
    private fb: FormBuilder,
    
    private user_service:UseraccountService,
    private toastr: ToastrService,) 
  { 
    this.loginForm = this.fb.group({
      UserCode: ['', [Validators.required]],     
      UserEmail: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    });
  }

  ngOnInit(): void {
  }

  formHasError(controlName: string, errorName: string) {
    return this.loginForm.controls[controlName].hasError(errorName);
 }
  forgot() {

    if (this.loginForm.valid) {
      this.isLoading=true;
      debugger;
      this.disableButton=true;
      this.user_service.Post_forgot(this.loginForm.value).subscribe(res => { 
        console.log(res);
        if(res)
        {
          this.disableButton=false;
        this.toastr.success('Password successfully Send to your Email-id'); 
        this.isLoading=false;

        }
      },
      error=>
      {
        this.isLoading=false;
        this.disableButton=false;
        this.toastr.error('Something Went Wrong!! Please check your User Code and Email-id');   
      });
  }
}

}

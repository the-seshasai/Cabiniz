import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { UseraccountService } from '../useraccount.service';
import { PasswordValidation } from './PasswordValidation';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  
  AddChangeForm: FormGroup;
  Get_username:string;
  pwspattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
  constructor(
    private fb: FormBuilder,
    private user_service:UseraccountService,
    private toastr: ToastrService, ) {
    this.AddChangeForm = this.fb.group({
      EmpCode: ['', [Validators.required]],
      username: ['', [Validators.required]],
      newpassword: ['', [Validators.required]],
      confirmpassword: ['', Validators.required]
    },
    {
      validator: PasswordValidation.MatchPassword
    }
    );
   }

  ngOnInit(): void {
    this.Get_username=localStorage.getItem('username');
    this.AddChangeForm.get('EmpCode').setValue(this.Get_username);
    
    this.AddChangeForm.get('username').setValue(localStorage.getItem('UserId'));
    
  }

  formHasError(controlName: string, errorName: string) {
    return this.AddChangeForm.controls[controlName].hasError(errorName);
 }

 changePassword() {
   debugger;
  
  if (this.AddChangeForm.valid) {
    this.user_service.PostChange_Password(this.AddChangeForm.value).subscribe(res => {
      console.log(res);
    this.toastr.success('Password successfully updated');
    });
  }
}

}

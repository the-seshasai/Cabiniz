import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoleAccessService } from '../role-access.service';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.css']
})
export class AddModuleComponent implements OnInit {
  ModId:number;
  AddModuleForm = this.fb.group({
    ModId: [0],
  ModName: ['',Validators.required]
  });
  constructor( private matDialog: MatDialogRef<AddModuleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route:ActivatedRoute,
    private Role_access:RoleAccessService,
    private toastr: ToastrService,
    private datePipe:DatePipe,
    private fb:FormBuilder,
    private _Router: Router) {

      this.ModId=parseInt(this.data.ModId);
     }

  ngOnInit(): void {
  }
  formHasError(controlName: string, errorName: string) {
    return this.AddModuleForm.controls[controlName].hasError(errorName);
 }
 Submit_Module()
 {
   debugger;
 if (this.ModId === 0) {
     debugger;
     this.AddModuleForm.controls['ModId'].setValue(0);
     if (this.AddModuleForm.valid) {
       this.Role_access.post_Module(this.AddModuleForm.value).subscribe(res => {
         this.toastr.success('successfully Saved');
         this.matDialog.close();
         
       });
     }
   }
 }
}

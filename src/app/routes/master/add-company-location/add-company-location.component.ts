import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDateAdapter, APP_DATE_FORMATS } from '@shared/date.adapter';
import { Company_interface, RoleaccessService } from 'app/routes/modules/roleaccess.service';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../company/company.service';
import {  GetAmenities_interface, MasterService } from '../master.service';

@Component({
  selector: 'app-add-company-location',
  templateUrl: './add-company-location.component.html',
  styleUrls: ['./add-company-location.component.scss'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class AddCompanyLocationComponent implements OnInit {
  Locid:any;
  selected=0;
  selected2=0;
  selected3=0;
  emailPattern = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  DoorPattern=/^[a-zA-Z0-9,./!? ]*$/;
  ContactPersonPattern=/^[a-zA-Z]+$/;
  EffectiveStatus_List = ['Active', 'In-Active'];
  curmonth = (new Date().getMonth());
  curyear=(new Date().getFullYear());
  curdate=(new Date().getDate());
  minDate = new Date(this.curyear, this.curmonth-3, this.curdate); 
  maxDate = new Date(this.curyear, this.curmonth, this.curdate+7);


  fileToUpload: File = null;

  AddlocationForm = this.fb.group({


    LocId: [''],
    CompId: ['',Validators.required],
    DoorNum:  [''],
    BuildingName:  ['',Validators.required],
    FloorName:  [''],
    StreetName:  [''],
    Area: ['',Validators.required],
    City:  [''],
    District:  [''],
    StateUT:  [''],
    PinCode:  [''],
    LocEmail:  ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    LocContactNumber:  ['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    LocContactPerson:  ['',[Validators.required,Validators.pattern(this.ContactPersonPattern)]],

    AvailableDays:[''],
    AvailableTime:[''],
   

    LocEffDate:  ['',Validators.required],
    LocEffStat:  ['',Validators.required],
    CreatedBy:  [''],
    CreatedOn:  [''],
    ModifiedBy:  [''],
    ModifiedOn:  [''],
   Temp_AmenityList:[],
      AmenityList: this.fb.array([
        this.fb.group({     
          AmenityId: [''],
        AmenityDescription:[''],
        AmenityCharge:[''],
        })
       
      ]),
          

      LocationImageList: this.fb.array([
        this.fb.group({     
          LocationImagepk:[''],
          LocationImageGId:[''],
          ComId: [''],
          CompanyName: [''],
          LocId:[''],
          LocationName: [''],
          ImageURL:[''],
          Base64type: [''],

        })
       
      ]),
  });



  AvailableDays_List = ['All Days', 
  'Mon-Fri',
   'Mon-Sat',
   'Tue,Thur,Sat',
   'Sunday',
   'Monday',
   'Tuesday',
   'Wednesday',
   'Thursday',
   'Friday',
   'Saturday',
   'Sunday',
  ];
  WorkingSlot_List = ['Full-Day(09AM-06PM)', 
  'Morning(09AM-01PM)', 
  'Afternoon(02PM-6PM)',
  'Evening(6PM-10PM)',
  'Night(10PM-06AM)'
];


  base64Image:any;

  file: File;
  compid: number;

  constructor(
    private router:ActivatedRoute,
    private _Router: Router,
    private fb:FormBuilder,
    private companyservice:CompanyService,
    private role_service:RoleaccessService,
    private masterservice:MasterService,
    private toastr: ToastrService,
  ) {
    this.AddlocationForm.get('LocEffDate').setValue(new Date());
    this.AddlocationForm.get('LocEffStat').setValue('Active');
      this.Locid=parseInt(this.router.snapshot.paramMap.get('LocId'));
      this.compid=parseInt(this.router.snapshot.paramMap.get('Compid'));
   }
   
   TemArrayList=[];
  //  TemArrayListForm = this.fb.group({
  //   AmList: this.fb.array([
  //     this.fb.group({     
  //       AmenityId: [''],
  //       AmenityDescription:[''],
  //       AmenityCharge:[''],
  //     })
     
  //   ]),
        
  // });
   Company_List: Array<Company_interface>;
   GetAmenities_list: Array<GetAmenities_interface>;


   setDefaultPic(page) {
    let chageimage;
    if (page === 'user') {
      chageimage = 'assets/images/camera.svg';
    }
  
    this.base64Image = chageimage;
  }

   get AmentityControl() {
    return this.AddlocationForm.get('AmenityList') as FormArray;
  }
  ngOnInit(): void {





    // this.base64Image = Array(this.LocationImageListControl.length).fill([]).map(() => ['']);

    const AmentityControl = <FormArray>this.AmentityControl;
    for (let i = AmentityControl.length - 1; i > 0; i--) {
      AmentityControl.removeAt(i);
    }
 

    if(this.Locid !==0)
    {
      
      this.masterservice.GetLocationEdit_Byid(this.Locid,this.compid).subscribe(res => {
        console.log("Location");
        console.log(res);
        this.AddlocationForm.patchValue(res[0]);
     
        res[0].LocationImageList.forEach(val => {

          this.LocationImageListControl.push(
            this.fb.group({
              LocationImagepk:[''],
                LocationImageGId:[''],
                ComId: [val.ComId],
                CompanyName: [val.CompanyName],
                LocId:[''],
                LocationName: [val.LocationName],
                ImageURL:[val.ImageURL],
                Base64type: [''],
         
            })
          );          
        })

     
        res[0].AmenityList.forEach(val=>
          {
            console.log("****");
            console.log(val);
           
            if(val!=null){
              this.TemArrayList.push(val.AmenityId);
              this.AmentityControl.push(
                this.fb.group({
                  AmenityId: [val.AmenityId],
                  AmenityDescription:[val.AmenityDescription],
                  AmenityCharge:[val.AmenityCharge],
                })
              );

              console.log( this.AmentityControl.value)
            }
          });

        this.AddlocationForm.get('Temp_AmenityList').setValue(this.TemArrayList);
      
         });
  
    }

    this.companyservice.Get_CompanyList().subscribe(res => {
      // console.log(res);
      this.Company_List = res;

    });

    this.masterservice.GetAmenities_list().subscribe(res_Amenities => {
      // console.log(res_Amenities);
      this.GetAmenities_list = res_Amenities;

    });
  }


  GetCompany(CompId)
  {
    debugger;

    this.companyservice.Get_CompanyByCode(CompId).subscribe(res => {

      let CompId =res[0].CompId;
      let CompanyName =res[0].CorporateId;

      for(var i=0;i<this.LocationImageListControl.length;i++)
      {
        this.LocationImageListControl.controls[i].get('ComId').setValue(CompId);
        this.LocationImageListControl.controls[i].get('CompanyName').setValue(CompanyName);

      }
     

      

    });
  }


  Setval(Value)
  {

    for(var i=0;i<this.LocationImageListControl.length;i++)
    {
      this.LocationImageListControl.controls[i].get('LocationName').setValue(Value);

    }

  }


  formHasError(controlName: string, errorName: string) {
    return this.AddlocationForm.controls[controlName].hasError(errorName);
 }



 get LocationImageListControl() {
  return this.AddlocationForm.get('LocationImageList') as FormArray;
}

 get AmenityControl() {
  return this.AddlocationForm.get('AmenityList') as FormArray;
}


addRow() {
 
    this.LocationImageListControl.push(
      this.fb.group({
        LocationImagepk:[''],
          LocationImageGId:[''],
          ComId: [''],
          CompanyName: [''],
          LocId:[''],
          LocationName: [''],
          ImageURL:[''],
          Base64type: [''],
   
      })
    );
   
  }

  DeleteRow(i)
  {
    this.LocationImageListControl.removeAt(i)
  }

  // image upload
// handleFileInput(file: FileList,row)
// {
// debugger;

//   this.fileToUpload = file.item(0);

//   //Show Image Preview Here
//   var  reader = new FileReader();

//   reader.onload =(event: any) => {

//     let imageval =event.target.result;

//     this.LocationImageListControl.controls[row].get('Base64type').setValue(imageval);

//   }

//   reader.readAsDataURL(this.fileToUpload);

//   console.log(this.fileToUpload)

// }


// handleFileInput(event: any, row: number) {
//   const file: FileList = event.target.files; // Extract the FileList from the event
//   if (!file || file.length === 0) {
//     // No file selected, handle this scenario accordingly
//     return;
//   }

//   this.fileToUpload = file.item(0);

//   // Show Image Preview Here
//   const reader = new FileReader();

//   reader.onload = (event: any,) => {

//     this.base64Image= event.target.result;
//     const imageval = event.target.result;
//     console.log("image data");
//     console.log(imageval);
//     this.LocationImageListControl.controls[row].get('Base64type').setValue(imageval);
//   };

//   reader.readAsDataURL(this.fileToUpload);

//   console.log(this.fileToUpload);
// }






  OnchangeImage($event,row) {
    debugger;
    this.file = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = () => {
      this.base64Image = myReader.result as string;

      let binarydata=[''];
      binarydata=this.base64Image.split(',');

   
      debugger;

      let binaryval =binarydata[1]
      this.LocationImageListControl.controls[row].get('Base64type').setValue(binaryval);
      // alert(this.LocationImageListControl.controls[row].get('Base64type').value);

      
      this.LocationImageListControl.controls[row].get('ImageURL').setValue('');
     
      console.log("IMAGE DATA");


      console.log(this.LocationImageListControl.value);

     
      
    };
    myReader.readAsDataURL(this.file);
    const groupfileExtension = this.file.name.split('.').pop();
    if (groupfileExtension.toUpperCase() === 'JPG' || groupfileExtension.toUpperCase() === 'PNG') {
     
    } else {
      
      this.toastr.info('Uploaded file is not a valid image.');
    }
  }
  

  Post_location()
  {
    debugger;


    console.log(this.LocationImageListControl.value);
    if (this.AddlocationForm.valid) {
    
    const AmentityControl = <FormArray>this.AmentityControl;
    for (let i = AmentityControl.length - 1; i > 0; i--) {
      AmentityControl.removeAt(i);
    }

    this.AddlocationForm.get('Temp_AmenityList').value.forEach(val => {
      console.log("&&&&&&&&&");
      console.log(val);
      this.AmenityControl.push(this.fb.group({
        AmenityId:[val],       
        }),
        );
          
        });

    this.AmenityControl.removeAt(0);

    if (this.Locid !== 0) {

      debugger;

      if (this.AddlocationForm.valid) {
        console.log(this.AddlocationForm.value);
        
        this.masterservice.putLocation(this.AddlocationForm.value).subscribe(res => {
          this.toastr.success('updated successfully');
          this._Router.navigateByUrl('/master/companylocationlist');
        });
      }
    } else if (this.Locid === 0) {
      
      if (this.AddlocationForm.valid) {
        this.masterservice.postlocation(this.AddlocationForm.value).subscribe(res => {
        
          this.toastr.success('saved successfully');
          this._Router.navigateByUrl('/master/companylocationlist');
         
        });
      
    }
  }
    }

}

}

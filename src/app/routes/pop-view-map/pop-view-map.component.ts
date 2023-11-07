import { Component,ViewChild,ViewEncapsulation,OnInit, Inject, ElementRef} from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pop-view-map',
  templateUrl: './pop-view-map.component.html',
  styleUrls: ['./pop-view-map.component.scss']
})
export class PopViewMapComponent implements OnInit {
  
  element: HTMLElement;
  inlongitude:any;
  inlatitude:any;
  outlongitude:any;
  outlatitude:any;
  url:any;
  dangerousUrl:any;
  trustedUrl:any;
  mapflagView;
  constructor(
    private matDialog: MatDialogRef<PopViewMapComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  
  )
{

 
  // this.inlatitude=data.inLatitudes;
  // this.inlongitude=data.inlongitudes;
  // this.outlatitude=data.outLatitudes;
  // this.outlongitude=data.outlongitudes;

  if(data.inLatitudes)
  {
  if (data.inLatitudes.charAt(0) === '"' && data.inLatitudes.charAt(data.inLatitudes.length -1) === '"')
{
  this.inlatitude=data.inLatitudes.substr(1,data.inLatitudes.length -2);
}
  }

if(data.inlongitudes)
{
if(data.inlongitudes.charAt(0) === '"' && data.inlongitudes.charAt(data.inlongitudes.length -1) === '"')
{
  this.inlongitude=data.inlongitudes.substr(1,data.inlongitudes.length -2);
}
}

if(data.outLatitudes)
{
if (data.outLatitudes.charAt(0) === '"' && data.outLatitudes.charAt(data.outLatitudes.length -1) === '"')
{
  this.outlatitude=data.outLatitudes.substr(1,data.outLatitudes.length -2);
}
}

if(data.outlongitudes)
{
if (data.outlongitudes.charAt(0) === '"' && data.outlongitudes.charAt(data.outlongitudes.length -1) === '"')
{
  this.outlongitude=data.outlongitudes.substr(1,data.outlongitudes.length -2);
}
}


 this.mapflagView=data.MapFlag;
 if(this.mapflagView=='In')
 {
  
  this.dangerousUrl = "https://maps.google.com/maps?q=" + this.inlatitude +',' + this.inlongitude + "&z=15&output=embed";
  this.trustedUrl =this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousUrl);
 }
 else
 {
   
  this.dangerousUrl = "https://maps.google.com/maps?q=" + this.outlatitude +',' + this.outlongitude + "&z=15&output=embed";
  this.trustedUrl =this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousUrl);
 }

}

  ngOnInit()
  {
    
}





}



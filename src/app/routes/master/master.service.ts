import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment.prod';
import { Observable } from 'rxjs';

export interface GetLocation
{
  LocId: number;
    CompId: number;
    DoorNum: number;
    BuildingName: string;
    FloorName: string;
    StreetName: string;
    Area: string;
    City: string;
    District: string;
    StateUT: string;
    PinCode: number;
    LocEmail: string;
    LocContactNumber: number;
    LocContactPerson: string;
    LocEffDate: Date;
    LocEffStat: string;
    CreatedBy: string;
    CreatedOn: string;
    ModifiedBy: string;
    ModifiedOn: string;
    AmenityList: [
      {
        AmenityId: number;
        AmenityDescription: string;
        AmenityCharge:string;
      }
    ]
    LocationImageList: [
      {
        LocationImagepk: any;
        LocationImageGId: any;
        ComId: number;
        CompanyName: any;
        LocId:  number;
        LocationName: any;
        ImageURL: any;
        Base64type: any;
      }
    ]
}

export interface GetAmenities_interface
{
    AmenityId: number;
    AmenityDescription: string;
    AmenityCharge: string;
   Select:boolean;
}


// Floor Interface name

export interface Floor_Interface
{
  FloorId: number;
  CompId: number;
  LocId: number;
  FloorCode: string;
  FloorName: string;
  FlrEffDate: string;
  FlrEffStat: string;
  CreatedBy: string;
  CreatedOn: string;
  ModifiedBy: string;
  ModifiedOn: string;
}

// cubicle interface

export interface cubicle_interface
{
  CMId: number;
  CompId: number;
  LocId: number;
  FloorId: number;
  CubicleCode: string;
  CubicleNo: number;
  CubicleName: string;
  TariffPerDay: number;
  AvailableSlot: string;
  CubEffDate: Date;
  CubEffStat: string;
  CreatedBy: string;
  CreatedOn: Date;
  ModifiedBy: string;
  ModifiedOn: Date;
}


// Meeting interface

export interface meeting_interface
{
  MRMId: number;
  CompId: number;
  LocId: number;
  FloorId: number;
  MRMCode: string;
  MRMNo: number;
  MRMName: string;
  TariffPerDay: number;
  AvailableSlot: string;
  MRMEffDate: Date;
  MRMEffStat: string;
  CreatedBy: string;
  CreatedOn: Date;
  ModifiedBy: string;
  ModifiedOn: Date;
}


@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  Get_Locationlist()
  {
    return this.http.get<Array<GetLocation>>(environment.serverUrl + 'Location/GetLocation');
  }

  GetAmenities_list()
  {
    return this.http.get<Array<GetAmenities_interface>>(environment.serverUrl + 'Location/GetAmenities');
  }

  postlocation(res: GetLocation) {
    const data = {
      ...res,
      status: true,
      CreatedBy:localStorage.getItem('username'),
      CreatedOn:new Date(),
      RoleId: localStorage.getItem('roleId')
    };
    
    return this.http.post(environment.serverUrl + 'Location/SaveLocation', data);
  }

  putLocation(res: GetLocation) {
    const data = {
      ...res,
      status: true,
      ModifiedBy:localStorage.getItem('username'),
      ModifiedOn:new Date(),
      RoleId: localStorage.getItem('roleId')
    };
   console.log(res);
    return this.http.post(environment.serverUrl + 'Location/EditLocation' , data);
  }

  GetLocationEdit_Byid(locid,compid)
  {
    return this.http.get<GetLocation>(environment.serverUrl + 'Location/GetLocationById/' + compid + '/' + locid);

  }

  GetLocation_bycompanyid(Comid :number)
  {
    return this.http.get<Array<GetLocation>>(environment.serverUrl + 'Location/GetLocationByCompany' + '/'  + Comid);
  }

  // Floor service

  GetFloorsList_byLocationid(locationid :number)
  {
    debugger;
    return this.http.get<Array<Floor_Interface>>(environment.serverUrl + 'Floor/GetFloorByLocation' + '/'  + locationid);
  }

  GetFloors_bylocationid(locationid :number)
  {
    return this.http.get<Array<Floor_Interface>>(environment.serverUrl + 'Floor/GetFloors' + '/'  + locationid);
  }


  Get_FloorById(FloorId :number)
  {
    return this.http.get<Array<Floor_Interface>>(environment.serverUrl + 'Floor/GetFloorById' + '/'  + FloorId);
  }

  PostFloor(res: Floor_Interface) {
    const data = {
      ...res,
      status: true,
      CreatedBy:localStorage.getItem('username'),
      CreatedOn:new Date(),
      RoleId: localStorage.getItem('roleId')
    };
    
    return this.http.post(environment.serverUrl + 'Floor/SaveFloor', data);
  }

  PutFloor(res: Floor_Interface) {
    const data = {
      ...res,
      status: true,
      ModifiedBy:localStorage.getItem('username'),
      ModifiedOn:new Date(),
      RoleId: localStorage.getItem('roleId')
    };
   console.log(res);
    return this.http.post(environment.serverUrl + 'Floor/EditFloor' , data);
  }





  // Cubicle interface

  GetCubicles_byFloorid(Floorid :number)
  {
    return this.http.get<Array<cubicle_interface>>(environment.serverUrl + 'Cubicle/GetCubicles' + '/'  + Floorid);
  }

  GetCubicles_byCubicleId(CubicleId :number)
  {
    return this.http.get<Array<cubicle_interface>>(environment.serverUrl + 'Cubicle/GetCubicleById' + '/'  + CubicleId);
  }



  PostCubicle(res:cubicle_interface) {
    const data = {
      ...res,
      status: true,
      CreatedBy:localStorage.getItem('username'),
      CreatedOn:new Date(),
      RoleId: localStorage.getItem('roleId')
    };
    
    return this.http.post(environment.serverUrl + 'Cubicle/SaveCubicle', data);
  }

  PutCubicle(res:cubicle_interface) {
    const data = {
      ...res,
      status: true,
      ModifiedBy:localStorage.getItem('username'),
      ModifiedOn:new Date(),
      RoleId: localStorage.getItem('roleId')
    };
   console.log(res);
    return this.http.post(environment.serverUrl + 'Cubicle/EditCubicle' , data);
  }

  // MeetingRoom interface
  

  getMR_byfloorid(Floorid :number)
  {
    debugger;
    return this.http.get<Array<meeting_interface>>(environment.serverUrl + 'MeetingRoomMaster/GetMeetingRoomMaster' + '/'  + Floorid);
  }

  GetMeetingRoom_byMRId(MeetingRoomMasterId :number)
  {
    return this.http.get<Array<meeting_interface>>(environment.serverUrl + 'MeetingRoomMaster/GetMeetingRoomMasterById' + '/'  + MeetingRoomMasterId);
  }

  Post_Meeting(res:meeting_interface) {
    const data = {
      ...res,
      status: true,
      CreatedBy:localStorage.getItem('username'),
      CreatedOn:new Date(),
      RoleId: localStorage.getItem('roleId')
    };
    
    return this.http.post(environment.serverUrl + 'MeetingRoomMaster/SaveMeetingRoomMaster', data);
  }

  Put_Meeting(res:meeting_interface) {
    const data = {
      ...res,
      status: true,
      ModifiedBy:localStorage.getItem('username'),
      ModifiedOn:new Date(),
      RoleId: localStorage.getItem('roleId')
    };
   console.log(res);
    return this.http.post(environment.serverUrl + 'MeetingRoomMaster/EditMeetingRoomMaster' , data);
  }

}

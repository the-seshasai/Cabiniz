import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';



export interface Load_WorkSpaceBy_City
{
  LocId:number;
    CompId: number;
    DoorNum:number;
    BuildingName: string;
    FloorName:string;
    StreetName: string;
    Area: string;
    City: string;
    District: string;
    StateUT: string;
    PinCode: number;
    LocEmail: string;
    LocContactNumber: number;
    LocContactPerson: string;
    LocEffDate:string;
    LocEffStat: string;
    CreatedBy: string;
    CreatedOn: string;
    ModifiedBy: string;
    ModifiedOn: string;
    AvailableSeat: number;
    AvailableConference: number;
}

export interface ShowAvailableSeats_interface
{
    CMId: number;
    CompId: number;
    LocId: number;
    FloorId: number;
    CubicleCode: number;
    CubicleNo: number;
    CubicleName:string;
    TariffPerDay:number;
    AvailableSlot: string;
    CubEffDate:string;
    CubEffStat:string;
    CreatedBy:string;
    CreatedOn:string;
    ModifiedBy:string;
    ModifiedOn:string;
}

export interface ShowAvailable
{
  CMId:number;
  CompId:number;
  LocId: number;
  FloorId:number;
  CubicleCode:number;
  CubicleNo:number;
  CubicleName: string;
  TariffPerDay: number;
  CubEffStat: string;
  BookedFrom: Date;
  BookedTo: Date;
  BookedOn: Date;
  AvailableStatus: string;
}

export interface Post_BookingInterface
{
  BookingId: number;
  UserCode: string;
  BookingType: string;
  CompId: number;
  LocId: number;
  FloorId: number;
  SeatNo: number;
  SeatName: string;
  BookedFrom: Date;
  BookedTo: Date;
  BookedNoDays: number;
  TotalAmount: number;
  PaymentMode: string;
  IsPaid: string;
  BookedOn: Date;
  BookedBy: string;
  ModifiedOn: string;
  ModifiedBy: string;
  ApprovalStatus: string;
}

export interface ListBookedWorkSpace_interface
{
  BookingId:  number;
    UserCode: string;
    BookingType: string;
    CompId:  number;
    LocId:  number;
    FloorId:  number;
    SeatNo: number;
    SeatName:string;
    BookedFrom: string;
    BookedTo: string;
    BookedNoDays:  number;
    TotalAmount: number;
    PaymentMode: string;
    IsPaid:string;
    BookedOn: string;
    BookedBy: string;
    ModifiedOn: string;
    ModifiedBy: string;
    ApprovalStatus:string;
    CompanyName: string;
    BuildingName: string;
    Area: string;
    FloorName: string;
}

export interface Get_ForManager
{
  BookingId:  number;
    UserCode:  string;
    BookingType:  string;
    CompId:  number;
    LocId:  number;
    FloorId:  number;
    SeatNo:  number;
    SeatName: string;
    BookedFrom:  string;
    BookedTo:  string;
    BookedNoDays:  number;
    TotalAmount: number;
    PaymentMode: string,
    IsPaid: string,
    BookedOn:  string;
    BookedBy:  string;
    ModifiedOn:  string;
    ModifiedBy:  string;
    ApprovalStatus:  string;
}
export interface Get_ForHR
{
  BookingId:  number;
    UserCode:  string;
    BookingType:  string;
    CompId:  number;
    LocId:  number;
    FloorId:  number;
    SeatNo:  number;
    SeatName: string;
    BookedFrom:  string;
    BookedTo:  string;
    BookedNoDays:  number;
    TotalAmount: number;
    PaymentMode: string,
    IsPaid: string,
    BookedOn:  string;
    BookedBy:  string;
    ModifiedOn:  string;
    ModifiedBy:  string;
    ApprovalStatus:  string;
}

export interface Post_ApproveStatusInterface
{
  BookingId:number;
  BookingStatus:string;
}
export interface UserDashboardCount
{
  UserCode:string;
  TotalBookings: number;
  Pending: number;
  Approved: number;
  Rejected: number;
}

export interface Attendance_Interface
{
  AttId: number,
    CompName: string;
    LocName:string;
    BuildingName: string;
    FloorName: string;
    UserCode: string;
    GeoLocation:string; 
    INTime: string;
    OUTTime: string;
    ModifiedOn: string;
    ScanMode: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  
  get_LoadWorkSpaceByCity(GetCityName)
  {
    return this.http.get<Array<Load_WorkSpaceBy_City>>(environment.serverUrl + 'Bookings/LoadWorkSpaceByCity/' + GetCityName);
  }


  get_ShowAvailabl(companyname,locationname,BookFromDate,BookToDate,BookFromTime,BookToTime,SeatType)
  {
    return this.http.get<Array<ShowAvailable>>(environment.serverUrl + 'Bookings/ShowAvailableSeats/' + companyname + '/' + locationname + '/' + BookFromDate + '/' + BookToDate + '/' + BookFromTime + '/' + BookToTime +  '/' + SeatType);
  }

  get_ShowAvailableSeats(compId,LocId)
  {
    return this.http.get<Array<ShowAvailableSeats_interface>>(environment.serverUrl + 'Bookings/ShowAvailableSeats/' + compId + '/' + LocId);
  }

  get_UserDashboardCount(UserCode)
  {
    return this.http.get<Array<UserDashboardCount>>(environment.serverUrl + 'Bookings/DashboardCount/' + UserCode);
  }

  Post_Booking(res: Post_BookingInterface)
  {
    const data = {
      ...res,
      
      BookedBy:localStorage.getItem('UserId'),  
      UserCode: localStorage.getItem('UserId')
    };
    console.log(data);
    return this.http.post(environment.serverUrl + 'Bookings/BookWorkspace/', data);
  }



  // Approver Status

  Get_ListBookedWorkSpace()
  {
    
    return this.http.get<Array<ListBookedWorkSpace_interface>>(environment.serverUrl + 'Bookings/ListBookedWorkSpace');
  }

  Get_ForManager(UserCode)
  {
    return this.http.get<Array<Get_ForManager>>(environment.serverUrl + 'Bookings/BookingsForManager/' + UserCode);
  }

  Get_ForHR(UserCode)
  {
    return this.http.get<Array<Get_ForHR>>(environment.serverUrl + 'Bookings/BookingsForHR/' + UserCode);
  }



  Post_ApproveStatus(res: Post_ApproveStatusInterface)
  {
    const data = {
      ...res
    };
    console.log(data);
    return this.http.post(environment.serverUrl + 'Bookings/ApproveBookings/', data);
  }

  Get_AttendanceList(AppData:string)
  {
    return this.http.get<Array<Attendance_Interface>>(environment.serverUrl + 'Attendence/FetchAttendence/' + AppData);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment.prod';

export interface Seatmanagemen_Interface
{
    SeatId: number;
    SeatUId: string;
    CompId: number;
    CompanyName: string;
    LocId: number;
    BuildingName: string;
    FloorId:number;
    FloorName: string;
    CategoryName: string;
    TariffPerDay: any;
    NoOfParkingFourWheeler: number;
    NoOfParkingTwoWheeler:number;
    SeatItemId: number;
    SeatItemName: string;
    RoomName:string;
    AmenityDescription: string;
    SeatEffStat: string;
}

export interface PostSeatmanagemen_Interface{
  SeatId:number;
  SeatUId: string,
  CompId:number;
  LocId:number;
  FloorId:number;
  CategoryUId: string,
  SeatCode: string,
  TittleofSeat: string,
  NoofSeats: string,
  NoofRooms:any;
  TariffPerDay:number;
  AvailableSlot: string,
  IsParking: string,
  AmenityId:string;
  NoOfParkingFourWheeler: number;
  NoOfParkingTwoWheeler: number;
  SeatEffDate: any,
  SeatEffStat: string,
  CreatedBy: string,
  CreatedOn: any,
  ModifiedBy: string,
  ModifiedOn: any,
  SeatItemList: [
    {
      SeatItemId: number;
      SeatItemUId: string,
      SeatUId: string,
      SeatItemName: string,
      SeatItemCode: string,
      AvailableSlot: string
    }
  ],
  ParkingItemList: [
    {
      ParkingId:number;
      ParkingUId: string,
      SeatUId: string,
      ParkingName: string,
      AvailableSlot: string
    }
  ],
  RoomMasterList: [
    {
      RoomId:number;
      RoomUId: string,
      SeatUId: string,
      RoomName: string,
      Capacity:number;
      AvailableSlot: string
    }
  ]
}

@Injectable({
  providedIn: 'root'
})
export class SeatmanagementService {

  constructor(private http: HttpClient) { }

  Seatmanagementlist()
  {
    return this.http.get<Array<Seatmanagemen_Interface>>(environment.serverUrl + 'SeatMaster/GetSeatMasterList');
  }
  Get_SeatmanagementByid(SeatUId:string)
  {
    return this.http.get<Array<PostSeatmanagemen_Interface>>(environment.serverUrl + 'SeatMaster/SeatMasterListById/'+ SeatUId);
  }


  postSeatmanagement(res: PostSeatmanagemen_Interface) {
    const data = {
      ...res,     
    };
    return this.http.post(environment.serverUrl + 'SeatMaster/SaveSeats', data);
  }

  putSeatmanagement(res: PostSeatmanagemen_Interface) {
    const data = {
      ...res,

    };
    console.log(res);
    return this.http.post(environment.serverUrl + 'SeatMaster/EditSeatMaster' , data);
    
  }
}

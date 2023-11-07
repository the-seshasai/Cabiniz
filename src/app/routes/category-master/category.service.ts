import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment.prod';

export interface Category_Interface
{
  CategoryId: number;
  CategoryUId: string;
  CategoryName: string;
  CategoryCode: string;
  PricePerDay:any;
  PricePerMonth:any;
  CateCreatedOn: any;
  CateCreatedBy: string;
  CateModifiedOn:  any;
  CateModifiedBy: string;
  CateEffStat:string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  Get_categorylist()
  {
    return this.http.get<Array<Category_Interface>>(environment.serverUrl + 'Category/GetCategory');
  }
  Get_categorylistByid(CategoryUId:string)
  {
    return this.http.get<Array<Category_Interface>>(environment.serverUrl + 'Category/GetCategoryById/'+ CategoryUId);
  }


  postCategory(res: Category_Interface) {
    const data = {
      ...res,     
    };
    return this.http.post(environment.serverUrl + 'Category/SaveCategory', data);
  }

  putCategory(res: Category_Interface) {
    const data = {
      ...res,

    };
    console.log(res);
    return this.http.post(environment.serverUrl + 'Category/EditCategory' , data);
    
  }
}

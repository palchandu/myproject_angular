import { Injectable } from '@angular/core';
import { Category } from '../model/category.model';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { from, Observable } from 'rxjs/';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }
  async getCategory():Promise<Category[]>{
    const list=await this.httpClient.get<Category[]>('http://localhost:4500/category/get_category').toPromise();
    return list;
  }

  addCategory(category:Category):Observable<any[]>{
    return this.httpClient.post<any[]>('http://localhost:4500/category/new_category',category,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
    });
  }

}

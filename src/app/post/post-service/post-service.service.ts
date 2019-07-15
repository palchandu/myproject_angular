import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs/';
@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  url='http://localhost:4500/common/';

  constructor(private httpClient: HttpClient) { }

  async getImages():Promise<any[]>{
    const response=await this.httpClient.get<any[]>(this.url+'images').toPromise();
    return response['data'];
  }

}

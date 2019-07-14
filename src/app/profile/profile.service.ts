import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Profile } from '../model/profile.model';
import { from, Observable } from 'rxjs/';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  url='http://localhost:4500/common/';
  url_misc='http://localhost:4500/misc/'
  constructor(private httpClient: HttpClient) { }

  async getProfile():Promise<any[]>{
    const response=await this.httpClient.get<any[]>(this.url_misc+'get_profile').toPromise();
    return response;
  }
  addPicture(profile_picture):Observable<any[]>{
    return this.httpClient.post<any[]>(this.url+'upload',profile_picture);
  }
  async addProfile(profile_details):Promise<any[]>{
    const response=await this.httpClient.post<any[]>(this.url_misc+'add_profile',profile_details).toPromise();
    return response;
  }
  updateProfile(profile_details:Profile):Observable<any[]>{
    return this.httpClient.post<any[]>(this.url_misc+'update_profile',profile_details);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Profile } from '../model/profile.model';
import { from, Observable } from 'rxjs/';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  url='http://localhost:3000/common/';
  url_misc='http://localhost:3000/misc/'
  constructor(private httpClient: HttpClient) { }

  getProfile():Observable<Profile[]>{
    return this.httpClient.get<Profile[]>(this.url_misc+'get_profile');
  }
  addPicture(profile_picture):Observable<any[]>{
    return this.httpClient.post<any[]>(this.url+'upload',profile_picture);
  }
  addProfile(profile_details:Profile):Observable<any[]>{
    return this.httpClient.post<any[]>(this.url_misc+'add_profile',profile_details);
  }
  updateProfile(profile_details:Profile):Observable<any[]>{
    return this.httpClient.post<any[]>(this.url_misc+'update_profile',profile_details);
  }

}

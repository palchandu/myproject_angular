import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { async } from 'q';
@Component({
  selector: 'app-basic-profile',
  templateUrl: './basic-profile.component.html',
  styleUrls: ['./basic-profile.component.css']
})
export class BasicProfileComponent implements OnInit {

  profileForm:FormGroup;
  submitted=false;
  datas={};
  constructor(
              private formBuilder:FormBuilder,
              private profileService:ProfileService,
              private flashMessage: FlashMessagesService,
              private router: Router
              ) { }
  
  createProfileForm(){
    this.profileForm=this.formBuilder.group({
      fullName:['',Validators.required],
      designation:['',Validators.required],
      organisation:['',Validators.required]
    });
  }
  
  async getProfileData(){
    this.datas=await this.profileService.getProfile();
    console.log(this.datas);
    this.profileForm.patchValue({fullName:this.datas['fullName'],designation:this.datas['designation'],organisation:this.datas['organisation']});
  }
  ngOnInit() {
    this.getProfileData();
    this.createProfileForm();
  }

  get f(){ return this.profileForm.controls;}

  onSubmit(){
    this.submitted=true;
    if(this.profileForm.invalid){
      return;
    }
    const formValue = this.profileForm.value;
    var data={
      fullName:this.f.fullName.value,
      designation:this.f.designation.value,
      organisation:this.f.organisation.value,
      flage:'basic_update'
    };
    console.log(data);
   this.profileService.addProfile(data).then((result)=>{
     console.log(result['message']);
    this.showSuccessFlash(result['message']);
    this.router.navigate(['/profile/profile_basic']);
   }).catch((error)=>{
    this.showErrorFlash(error);
   })
   
  }

  showSuccessFlash(message) {
        // 1st parameter is a flash message text
        // 2nd parameter is optional. You can pass object with options.
        this.flashMessage.show(message, { cssClass: 'alert-success', timeout: 2000 });
    }
    showErrorFlash(message) {
      // 1st parameter is a flash message text
      // 2nd parameter is optional. You can pass object with options.
      this.flashMessage.show(message, { cssClass: 'alert-warning', timeout: 2000 });
    }


}

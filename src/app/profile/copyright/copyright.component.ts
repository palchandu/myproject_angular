import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.css']
})
export class CopyrightComponent implements OnInit {

  copyrightForm:FormGroup;
  submitted=false;
  datas={};
  constructor(private formBuilder:FormBuilder,
    private profileService:ProfileService,
    private flashMessage: FlashMessagesService,
    private router: Router) { }

    createProfileForm(){
      this.copyrightForm=this.formBuilder.group({
        copyright:['',Validators.required]
      });
    }

  async getProfileData(){
      this.datas=await this.profileService.getProfile();
      console.log(this.datas);
      this.copyrightForm.patchValue({copyright:this.datas['copyright']});
    }
    

  ngOnInit() {
    this.createProfileForm();
    this.getProfileData();

  }
  get f(){ return this.copyrightForm.controls;}
  onSubmit(){
    this.submitted=true;
    if(this.copyrightForm.invalid){
      return;
    }
    var data={
      copyright:this.f.copyright.value,
      flage:'copyright_update'
    };
    console.log(data);
   this.profileService.addProfile(data).then((result)=>{
     console.log(result['message']);
    this.showSuccessFlash(result['message']);
    this.router.navigate(['/profile/copyright']);
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

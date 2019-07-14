import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
@Component({
  selector: 'app-picture-profile',
  templateUrl: './picture-profile.component.html',
  styleUrls: ['./picture-profile.component.css']
})
export class PictureProfileComponent implements OnInit {

  profilePictureForm:FormGroup;
  submitted=false;
  selectedFile:File;
  error='';
  datas={};
  image_url='';
  constructor(
              private formBuilder:FormBuilder,
              private _profileService:ProfileService,
              private flashMessage: FlashMessagesService,
              private router: Router
              ) { }

  async getProfileData(){
    this.datas=await this._profileService.getProfile();
    this.image_url=this.datas['image'];
    console.log(this.image_url);
  }

  createProfileForm(){
    this.profilePictureForm=this.formBuilder.group({
      profile_pic:['',Validators.required]
    });
  }

  //Upload profile picture
  uploadProfile(event){
       this.selectedFile = event.target.files[0];
    }
  
    onProfileUpload(){
         if(this.selectedFile!=null){
           const uploadData = new FormData();
         uploadData.append('file', this.selectedFile, this.selectedFile.name);
         this._profileService.addPicture(uploadData).subscribe(res=>{
           let resSTR = JSON.stringify(res);
           let resJSON = JSON.parse(resSTR);
           console.log(resJSON.files.imagePath);
           var data={
            image:resJSON.files.imagePath,
            flage:'picture_update'
          };
          console.log(data);
         this._profileService.addProfile(data).then((result)=>{
           console.log(result['message']);
          this.showSuccessFlash(result['message']);
          this.router.navigate(['/profile/profile_picture']);
         }).catch((error)=>{
          this.showErrorFlash(error);
         })

         },
         error=>{
           this.error=error;
          
           console.log(error);
         })
         }
         else{
           this.showErrorFlash('Please select file');
         }
        
      }


  ngOnInit() {
    this. createProfileForm();
    this.getProfileData();
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

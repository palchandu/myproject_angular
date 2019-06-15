import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from '../model/profile.model';
import { ProfileService } from './profile.service';
import { MessageService } from '../services/message.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { from, Observable } from 'rxjs/';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm:FormGroup;
  submitted = false;
  loading = false;
  selectedFile:File;
  error='';
  profile_details=[];
  constructor(
    private fb: FormBuilder,
    private _profileService:ProfileService,
    private _messageService:MessageService,
    private router: Router,
    private flashMessage: FlashMessagesService
    ) { }

  ngOnInit() {
    /*Get profile details */
    this._profileService.getProfile().subscribe(res=>{
      this.profile_details=res;
      this.profileForm.setValue({profile_pic:this.profile_details[0].image,fullname:this.profile_details[0].name,designation:this.profile_details[0].designation,organisation:this.profile_details[0].organisation,copyright:this.profile_details[0].copyright,profileId:this.profile_details[0]._id});
    },
    error=>{
      this.error=error;
    })
    this.profileForm=this.fb.group({
      fullname:['',[Validators.required,Validators.minLength(3),Validators.maxLength(60)]],
      designation:['',[Validators.required]],
      organisation:['',[Validators.required]],
      profile_pic:['',[Validators.required]],
      copyright:['',[Validators.required]],
      profileId:['']
    });
    
  }
 // convenience getter for easy access to form fields
 get f() { return this.profileForm.controls; }

  onSubmit():void{
    this.submitted = true;
    this.loading = true;
    // stop here if form is invalid
    if (this.profileForm.invalid) {
        return;
    }
    var arrayVals={
      name:this.f.fullname.value,
      designation:this.f.designation.value,
      organisation:this.f.organisation.value,
      image:this.f.profile_pic.value,
      copyright:this.f.copyright.value,
      _id:this.f.profileId.value
    }
    if(this.f.profileId.value==''){
      this._profileService.addProfile(arrayVals).subscribe(res=>{
        //this._messageService.success('Registration successful', true);
        this.showSuccessFlash();
        // this.router.navigate(['/profile']);
        this.loading = false;
      },
      error=>{
        this.error=error;
        this.showErrorFlash('Something wrong!try again');
        this.loading = false;
      });
    }
    else{
      this._profileService.updateProfile(arrayVals).subscribe(res=>{
        //this._messageService.success('Registration successful', true);
        this.showSuccessFlash();
         //this.router.navigate(['/profile']);
         this.loading = false;
      },
      error=>{
        this.error=error;
        this.showErrorFlash('Something wrong!try again');
        this.loading = false;
      });
    }
  }
  uploadProfile(event){
    this.selectedFile = event.target.files[0];
  }
  onProfileUpload(){
    if(this.selectedFile!=null){
      const uploadData = new FormData();
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    this._profileService.addPicture(uploadData).subscribe(res=>{
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      this.profileForm.setValue({profile_pic:resJSON[0].mediaSource,fullname:this.profile_details[0].name,designation:this.profile_details[0].designation,organisation:this.profile_details[0].organisation,copyright:this.profile_details[0].copyright,profileId:this.profile_details[0]._id});
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
  showSuccessFlash() {
    // 1st parameter is a flash message text
    // 2nd parameter is optional. You can pass object with options.
    this.flashMessage.show('Sucessfully Updated', { cssClass: 'alert-success', timeout: 2000 });
}
showErrorFlash(message) {
  // 1st parameter is a flash message text
  // 2nd parameter is optional. You can pass object with options.
  this.flashMessage.show(message, { cssClass: 'alert-warning', timeout: 2000 });
}

}

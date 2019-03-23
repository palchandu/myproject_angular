import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm:FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.profileForm=this.fb.group({
      fullname:['',Validators.required,Validators.minLength(3),Validators.maxLength(15)],
      designation:['',Validators.required],
      organisation:['',Validators.required],
      profile_pic:['',Validators.required],
      copyright:['',Validators.required]
    });
  }
 // convenience getter for easy access to form fields
 get f() { return this.profileForm.controls; }

  onSubmit():void{
    this.submitted = true;
    // stop here if form is invalid
    if (this.profileForm.invalid) {
        return;
    }

    console.log(this.profileForm.value);
  }
}

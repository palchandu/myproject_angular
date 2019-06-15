import { Component, OnInit,ViewChild } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Category } from '../model/category.model';
import { CategoryService } from '../services/category.service';
import { FormControl, FormGroup,  FormBuilder,  Validators, FormArray } from '@angular/forms';
import {Observable} from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  listCategory:Category[];
  postForm:FormGroup;
  submitted = false;
  error='';
  
  constructor(private fb:FormBuilder,private _categoryService:CategoryService) {}
   orders = [
    { id: 1, name: 'order 1' },
    { id: 2, name: 'order 2' },
    { id: 3, name: 'order 3' },
    { id: 4, name: 'order 4' }
  ];
  

  ngOnInit() { 
    /*List of category */
    var categoryFormGroup:FormGroup=new FormGroup({});

    this._categoryService.getCategory().subscribe(res=>{
      this.listCategory=res;
      for(let index = 0; index < this.listCategory.length; index++){
        let control:FormControl=new FormControl(this.listCategory[index]['name'],Validators.required);
        var vals=this.listCategory[index]['name'];
        categoryFormGroup.addControl('hello',control);
      }
      console.log(categoryFormGroup);
    });
    
    this.postForm=this.fb.group({
        post_body:['',[Validators.required]],
        categories:categoryFormGroup
    });
  }

  get f() { return this.postForm.controls; }
  publishBlog():void{
    this.submitted = true;
    if (this.postForm.invalid) {
      return;
  }
    console.log(this.f.post_body.value);
  }
  
  }

  

  
  
  


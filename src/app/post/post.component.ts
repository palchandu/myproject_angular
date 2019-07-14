import { Component, OnInit,ViewChild } from '@angular/core';
import { Category } from '../model/category.model';
import { CategoryService } from '../services/category.service';
import { FormControl, FormGroup,  FormBuilder,  Validators, FormArray } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

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
  htmlContent = '';
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '20rem',
    maxHeight: '50rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    sanitize: false,
    toolbarPosition: 'top',
    defaultFontName: 'Arial',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };
  constructor(private fb:FormBuilder,private _categoryService:CategoryService) {}

  

  ngOnInit() { 
    this.postForm=this.fb.group({
        post_body:['',[Validators.required]]
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

  

  
  
  


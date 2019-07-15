import { Component, OnInit,ViewChild } from '@angular/core';
import { Category } from '../model/category.model';
import { CategoryService } from '../services/category.service';
import { FormControl, FormGroup,  FormBuilder,  Validators, FormArray } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PostServiceService } from './post-service/post-service.service';
import { from } from 'rxjs';
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
  closeResult: string;
  imageUrl:string;
  datas=[];
  modalReference: NgbModalRef;
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
  constructor(private fb:FormBuilder,private _categoryService:CategoryService,private modalService: NgbModal,private postService:PostServiceService) {}

  async getAllImages(){
    //this.datas=await this.postService.getImages();
    this.datas.push(await this.postService.getImages());
  }

  ngOnInit() { 
    this.postForm=this.fb.group({
      htmlContent:['',[Validators.required]]
    });
    this.getAllImages();
    console.log(this.datas);
  }

  get f() { return this.postForm.controls; }
  publishBlog():void{
    this.submitted = true;
    if (this.postForm.invalid) {
      return;
  }
    console.log(this.f.htmlContent.value);
  }

  /**
   * 
   *  Modal Open
   */

  openScrollableContent(longContent) {
    this.modalReference=this.modalService.open(longContent, { scrollable: true,size: 'xl' });
  }

  getUrl(event,image){
    event.preventDefault();
    this.imageUrl=image;
    this.modalReference.close();
    console.log(image);
  }

 
  }

  

  
  
  


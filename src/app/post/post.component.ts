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
  submitted = false;
  list:Category[];
  constructor(private modalService: NgbModal,private _categoryService:CategoryService,private formBuilder: FormBuilder) { 
    
  }
 
  async ngOnInit() {
    const list=await this._categoryService.getCategory(); 
  }
 

  }

  

  
  
  


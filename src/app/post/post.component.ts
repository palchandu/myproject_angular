import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Category } from '../model/category.model';
import { CategoryService } from '../services/category.service';
import { NgForm } from '@angular/forms';
import {Observable} from "rxjs";
import { from } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  category:Category={
    _id:null,
    name:null,
    created:null
  }
  listCategory:Category[];
  error:any;
  msg:String=null;
  public Editor = ClassicEditor;
  datePickerConfig: Partial<BsDatepickerConfig>;
  closeResult: string;
  public onReady( editor ) {
    editor.ui.view.editable.element.parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.view.editable.element
    );
}
  constructor(private modalService: NgbModal,private _categoryService:CategoryService) { 
    this.datePickerConfig = Object.assign({}, { 
      containerClass: 'theme-dark-blue' ,
      showWeekNumbers: true,
      dateInputFormat: 'DD/MM/YYYY',
      placement:'top',
    });
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  
  ngOnInit() {
    this._categoryService.getCategory().subscribe(res=>{
      this.listCategory=res;
    },
    error=>{
      this.error=error;
    }
    );
    
  }

  saveCategory(newCategory: Category):void{
    this._categoryService.addCategory(newCategory).subscribe(res=>{
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      console.log(resJSON.message);
      this.msg=resJSON.message;
    },
    error=>{
      this.error=error;
    })
    console.log(newCategory);
  }
}

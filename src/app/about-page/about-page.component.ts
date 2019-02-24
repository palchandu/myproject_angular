import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {

  public Editor = ClassicEditor;

  public onReady( editor ) {
    editor.ui.view.editable.element.parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.view.editable.element
    );
}

  constructor() { }

  ngOnInit() {
  }

}

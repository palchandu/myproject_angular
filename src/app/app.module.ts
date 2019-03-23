import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes  } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './error-handler';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { from } from 'rxjs';
import { CKEditorModule } from 'ng2-ckeditor';
import { AboutPageComponent } from './about-page/about-page.component';
import { PostComponent } from './post/post.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CategoryService } from './services/category.service';
import { ProfileComponent } from './profile/profile.component';
const appRout:Routes=[
  { path:'dashboard',component:DashboardComponent},
  { path:'login',component:LoginComponent},
  { path:'about',component:AboutPageComponent},
  { path:'post',component:PostComponent},
  { path:'profile',component:ProfileComponent},
  { path:'',redirectTo:'/dashboard',pathMatch:'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    AboutPageComponent,
    PostComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRout),
    BsDatepickerModule.forRoot(),
    NgbModule,
    HttpClientModule,
    FormsModule,
    CKEditorModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

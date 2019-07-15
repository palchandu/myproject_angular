import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes  } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './error-handler';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { from } from 'rxjs';
import { AboutPageComponent } from './about-page/about-page.component';
import { PostComponent } from './post/post.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CategoryService } from './services/category.service';
import { ProfileComponent } from './profile/profile.component';
import { ProfileService } from './profile/profile.service';
import { BasicProfileComponent } from './profile/basic-profile/basic-profile.component';
import { PictureProfileComponent } from './profile/picture-profile/picture-profile.component';
import { CopyrightComponent } from './profile/copyright/copyright.component';
import { PostServiceService } from './post/post-service/post-service.service';
const appRout:Routes=[
  { path:'dashboard',component:DashboardComponent},
  { path:'login',component:LoginComponent},
  { path:'about',component:AboutPageComponent},
  { path:'post',component:PostComponent},
  { path:'profile',component:ProfileComponent,children:[
    {path:'profile_basic',component:BasicProfileComponent},
    {path:'profile_picture',component:PictureProfileComponent},
    {path:'copyright',component:CopyrightComponent},
    {path:'',redirectTo:'profile_basic',pathMatch:'full'}
    ]
  },
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
    BasicProfileComponent,
    PictureProfileComponent,
    CopyrightComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRout),
    BsDatepickerModule.forRoot(),
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
    AngularEditorModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    CategoryService,
    ProfileService,
    PostServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

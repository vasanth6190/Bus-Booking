import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BuserviceService } from './buservice.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { MybookingsComponent } from './mybookings/mybookings.component';
import { IndexComponent } from './index/index.component';
import {HttpClientModule} from "@angular/common/http";
import { TravelsComponent } from './travels/travels.component';
import { MybusesComponent } from './mybuses/mybuses.component'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    MybookingsComponent,
    IndexComponent,
    TravelsComponent,
    MybusesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [BuserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

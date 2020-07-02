import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { MybookingsComponent } from './mybookings/mybookings.component';
import { IndexComponent } from './index/index.component';
import { TravelsComponent } from './travels/travels.component';
import { MybusesComponent } from './mybuses/mybuses.component';


const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:"home",component:HomeComponent},
  {path:"mybookings",component:MybookingsComponent},
  {path:"index",component:IndexComponent},
  {path:"travels",component:TravelsComponent},
  {path:"mybuses",component:MybusesComponent},
  {path:"**",component:IndexComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

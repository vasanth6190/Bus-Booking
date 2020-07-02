import { Component,Input,Output,OnInit } from '@angular/core';
import { BuserviceService } from './buservice.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public login
  public loggeduser
  public user = false
  public travels = false
  constructor(private router:Router,private service:BuserviceService,private http: HttpClient) {}
  gettravels(){
    return this.http.get("http://localhost:8000/travels",{
      headers:{"Content-type":"application/json"}
    })
  }
  ngOnInit(){
    this.service.role1.subscribe(data=>{
      if(data==="user"){
      this.user=true
      this.travels = false
    }
    else{
      this.user=false
      this.travels = true
    }
  })
    this.gettravels().subscribe(data=>{
      if(data){
      this.service.addtravels(data)
      }
    })
    this.service.login1.subscribe(data=>this.login=data)
    this.service.loginvalue1.subscribe(data=>this.loggeduser=data)
  }
  logout(){
   this.service.changelogin(false)
   this.service.changeloginvalue({})
   this.router.navigate(["/index"])
   this.service.onlogout([])
  }
}

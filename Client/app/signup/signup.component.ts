import { Component, OnInit } from '@angular/core';
import { BuserviceService } from '../buservice.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
   public signup:any
  constructor(private service:BuserviceService,private router:Router,private http: HttpClient) { }
   
  ngOnInit(): void {
  }
  onregister(value){
    return this.http.post("http://localhost:8000/users",value,{
      headers:{
        "Content-type":"application/json"
      }
    })
  }
  onsubmit(e){
    this.onregister(e.value).subscribe(data=>{
      if(data){
 this.service.changeloginvalue(e.value)
    this.service.changelogin(true)
    this.router.navigate(["/home"])
      }
    })
   
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuserviceService } from '../buservice.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   public submit:any
   public  loginvalue :any
   public doesnt = false
   public pass = false
  constructor(private router:Router,private service:BuserviceService,private http:HttpClient) { }

  ngOnInit(): void {
  }
  getbookings(value){
 return this.http.get(`http://localhost:8000/bookings/${value.name}`,{
   headers:{"Content-type":"application/json"}
 })
  }
  getbusesfortravelname(e){
    return this.http.get(`http://localhost:8000/travels/${e}`,{
      headers:{"Content-type":"application/json"}
    })
  }
  getlogin(value):Observable<any>{
    return this.http.get(`http://localhost:8000/users/${value.email}`,{
      headers:{"Content-type":"application/json"}
    })
   }
   onsubmit(e){
     this.submit=e.value
    this.getlogin(e.value).subscribe(data=> {
    if(data){
    this.loginvalue= data
    if(data==="Empty"){  
       this.doesnt = true
       this.pass=false
    }
    else{
      if(data.password===e.value.password){
        this.doesnt=false
        this.pass=false
        this.service.changeloginvalue(this.loginvalue)
        this.service.addrole(e.value.role)
        this.service.changelogin(true)

        if(e.value.role==="user")
        {
          this.getbookings(data).subscribe(data=>{
            if(data){
              this.service.addbookings(data["bookings"])
            }
          })
          this.router.navigate(["/home"])
        }
        else{
          var x = e.value.email.split(" ")
          this.getbusesfortravelname(x[0]).subscribe(data=>{
            if(data !="Empty"){
              this.service.initaddtravelbuses(data)
            }
          })
          this.router.navigate(["/travels"])
        }
        
      }
    else{
      this.pass=true
      this.doesnt=false
    }
    }
   } 
  }
   )
   
   }
}

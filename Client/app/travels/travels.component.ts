import { Component, OnInit } from '@angular/core';
import { BuserviceService } from '../buservice.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrls: ['./travels.component.css']
})
export class TravelsComponent implements OnInit {
  public loginvalues 
  public role
  public traveldetails:any
  public login
  public busadd:object[]=[]
  constructor(public service:BuserviceService,public http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.service.loginvalue1.subscribe(data=>this.loginvalues=data)
    this.service.login1.subscribe(data=>this.login=data)
    this.service.role1.subscribe(data=>this.role=data)
    this.service.travelbuses1.subscribe(data=>this.busadd=data)
  }
  addbusestoserver(e){
    return this.http.post("http://localhost:8000/travels",e,{
      headers:{"Content-type":"application/json"}
    })
  }
onsubmit(e){
  var x = e.value
  x.rupees = "Rs "+x.rupees
  this.busadd.push(x)
  this.addbusestoserver(x).subscribe(data=>console.log(data))
  this.service.addtravelbuses(this.busadd)
  this.router.navigate(["/mybuses"])
}
}

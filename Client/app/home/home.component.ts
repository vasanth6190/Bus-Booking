import { Component, OnInit } from '@angular/core';
import { BuserviceService } from '../buservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public loginvalues 
  public role
  public traveldetails:any
  public login
  public display = false
  public yes = false
  public countno:number
  public busdetails :object[]=[]
  public servicebusdetails:any
  public servicebooking:any
  public bookedname:string[]=[]
  public passengers:string[]=[]
  public seats  : string[]=[]
  public exceedseats 
  public 1 = true
  constructor(private service:BuserviceService,private router:Router) { }

  ngOnInit(): void {
    this.service.loginvalue1.subscribe(data=>this.loginvalues=data)
    this.service.login1.subscribe(data=>this.login=data)
    this.service.role1.subscribe(data=>this.role=data)
    this.service.busdetails1.subscribe(data=>this.servicebusdetails=data)
    this.service.mybookings1.subscribe(data=>this.servicebooking=data)
    if(this.servicebooking.length>0){
       this.servicebooking.map(e=>{
        this.bookedname.push(e.name)
       })
    }
  }
  seatclick(e){
    if(this.seats.indexOf(e)!=-1){
      return
  }
    if(this.passengers.length<this.seats.length){
      this.exceedseats = true
      return
    }
    if(this.passengers.length===0){
      if(this.seats.length===1){
        this.exceedseats = true
        return
      }
    }
    this.exceedseats = false
    this.seats.push(e)
    console.log(e)
  }
  removeseat(e){
    this.exceedseats = false
    let index 
    this.seats.map((a,ind)=>{
      if(a===e){
         index=ind
      }
    })
    this.seats.splice(index,1)
  }
  addbook(e){
     var total:object
     total = e
     total["passengers"] = this.passengers
     total["seatno"] = this.seats
    this.servicebooking.push(total)
    this.service.chnagemybookings(this.servicebooking)
    this.bookedname.push(e.name)
    this.router.navigate(["/mybookings"])
  }
  passengerscount(e){
    this.countno = Number(e.value.count)
  }
  sub(e){
    var objects = e.value
    for(var key in objects){
      this.passengers.push(objects[key])
    }
  }
onsubmit(e){
  if(e.value.from===e.value.to){
    this.display= true
    this.busdetails = []
    this.yes=false
  }
  else{
    this.display=false
   this.traveldetails = e.value
   this.busdetails = []
   
  this.servicebusdetails.map(a=>{
    if(this.servicebooking.length===0){
      if(a.from.toLowerCase()===e.value.from.toLowerCase() && a.to.toLowerCase()===e.value.to.toLowerCase() && a.date===e.value.date){
        this.busdetails.push(a)
     }
    }
    else{
      if(this.bookedname.indexOf(a.name)===-1){
        if(a.from===e.value.from && a.to===e.value.to && a.date===e.value.date){
          this.busdetails.push(a)
       }
      }
    }
   
   })
   this.yes = true
  }
}
}

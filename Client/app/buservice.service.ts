import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BuserviceService {
  constructor(private http:HttpClient) {}
   
  //login values
  private sample:any
  private loggedin:any
   private loginvalue  = new BehaviorSubject<object>({})
   loginvalue1 = this.loginvalue.asObservable()
   private login = new BehaviorSubject<boolean>(false)
   login1 = this.login.asObservable()

   
  changeloginvalue(value)
  {
    this.loginvalue.next(value)
  }
  changelogin(e:boolean){
    this.login.next(e)
  }
  //bus details
  private busdetails = new BehaviorSubject<any>([])
  busdetails1 = this.busdetails.asObservable()
  addtravels(e){
    this.busdetails.next(e)
  }
  //role
  private role = new BehaviorSubject<any>([])
  role1 = this.role.asObservable()
  addrole(e){
    this.role.next(e)
  }
  //myBookings
  private mybookings = new BehaviorSubject<any>([])
  mybookings1 = this.mybookings.asObservable()
  addbookings(e){
    this.mybookings.next(e)
  }
  private send :object = {name:"",bookings:""} 
  bookingsfromserver(){
    return this.http.post("http://localhost:8000/bookings",this.send,{
    headers:{"Content-type":"application/json"}
    })
  }
  onlogout(e){
    this.mybookings.next(e)
  }
  chnagemybookings(e){
     this.mybookings.next(e)
     this.loginvalue.subscribe(data=>{
      if(data){
        this.send["name"]= data["name"]
        this.send["bookings"] = e
        console.log("angular function service",this.send)
        this.bookingsfromserver().subscribe(data=>console.log("from server",data))
      }
    })
  }

  //travels login data
  private travelbuses = new BehaviorSubject<any>([])
  travelbuses1 = this.travelbuses.asObservable()
  addtravelbuses(e){
    this.travelbuses.next(e)
  }
  initaddtravelbuses(e){
    this.travelbuses.next(e)
  }
}

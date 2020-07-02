import { Component, OnInit } from '@angular/core';
import { BuserviceService } from '../buservice.service';

@Component({
  selector: 'app-mybuses',
  templateUrl: './mybuses.component.html',
  styleUrls: ['./mybuses.component.css']
})
export class MybusesComponent implements OnInit {
  public travelbuses:any
  public login
  constructor(private service:BuserviceService) { }

  ngOnInit(): void {
   this.service.login1.subscribe(data=>this.login=data)
   this.service.travelbuses1.subscribe(data=>this.travelbuses=data)
  }
  delete(e)
  { 
    let delindex = 0
     this.travelbuses.map((s,index)=>{
       if(s.name===e.name){
         delindex=index
       }
     })
     this.travelbuses.splice(delindex,1)
    this.service.addtravelbuses(this.travelbuses)
  }
}

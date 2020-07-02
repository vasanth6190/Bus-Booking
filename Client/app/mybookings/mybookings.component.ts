import { Component, OnInit } from '@angular/core';
import { BuserviceService } from '../buservice.service';

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.css']
})
export class MybookingsComponent implements OnInit {
public mybookings:any
public login
  constructor(private service:BuserviceService) { }

  ngOnInit(): void {
   this.service.mybookings1.subscribe(data=>this.mybookings=data)
   this.service.login1.subscribe(data=>this.login=data)
  }
   delete(e)
   { 
     let delindex = 0
      this.mybookings.map((s,index)=>{
        if(s.name===e.name){
          delindex=index
        }
      })
      this.mybookings.splice(delindex,1)
     this.service.chnagemybookings(this.mybookings)
   }
}

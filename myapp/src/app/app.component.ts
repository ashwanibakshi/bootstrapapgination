import { Component,ChangeDetectorRef, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  title = 'myapp';
  constructor(private cd:ChangeDetectorRef,private _http:HttpClient){}
  page=1; //default page
  numbers=10; //items per page
  itemsPerPage=10;
  users:any=[];

  ngOnInit() {
    this.getsample(1);
  }
  getsample(page){
    alert(page)
   this._http.get('http://localhost:3000/getname/'+page).subscribe(res=>{
     if(res['success']==false){
       alert('no data found')
     }
     else{
       this.users=res['users'];
       this.numbers= res['totalItems'];
       this.page=page;
       //let start=(page.page-1)*page.itemsPerPage;
       //let end=page.itemsPerPage>-1?(start+page.itemsPerPage):this.users;
       this.cd.detectChanges();
     }
   })
 }
}

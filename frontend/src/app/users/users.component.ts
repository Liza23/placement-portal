import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export class Userss {
  constructor(
    public username: string = '',
    public password: string = '',
  ){}
}
export class loggedin {
  constructor(
    public token: string = '',
    public id: string = '',
  ){}
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) { }
  current : Userss = new Userss();
  selectedTab: number=0;
  private base_url: string = 'http://localhost:5000/auth/';

  student = this.fb.group({
    username: [, [Validators.required]],
    password: [, [Validators.required]],
  });
  other = this.fb.group({
    username: [, [Validators.email]],
    password: [, [Validators.required]],
  });
  
  onSubmitStudent(){
    if(this.student.valid){
      this.http.post<loggedin>(this.base_url, JSON.stringify(this.current) + '/login', {'headers': { 'content-type': 'application/json' }})
      .subscribe(
        data => {console.log('User', data); sessionStorage.setItem('token',data.token); this.router.navigateByUrl('/student/'+data.id+'/home'); window.alert("Logged In successfully!");},
        error => { console.log('Error: ', error) ; sessionStorage.setItem('token',''); window.alert("Login Failed");}
        );
      }
      else{
       window.alert("Empty Fields!");
      }
  //  console.log(this.current.username,this.current.password,this.selectedTab);
  }
  onSubmitRecruiter(){
    if(this.other.valid){
      this.http.post<loggedin>(this.base_url, JSON.stringify(this.current), {'headers': { 'content-type': 'application/json' }})
      .subscribe(
        data => {console.log('User', data);sessionStorage.setItem('token',data.token); this.router.navigateByUrl('/recruiter/'+data.id+'/home'); window.alert("Logged In successfully!");},
        error => { console.log('Error: ', error);sessionStorage.setItem('token',''); window.alert("Login Failed");}
        );
      }
      else{
       window.alert("Empty Fields or Email format!");
      }
    // console.log(this.current.username,this.current.password,this.selectedTab);
   }
   onSubmitCoordinator(){
    if(this.other.valid){
      this.http.post<loggedin>(this.base_url, JSON.stringify(this.current), {'headers': { 'content-type': 'application/json' }})
      .subscribe(
        data => {console.log('User', data);sessionStorage.setItem('token',data.token); this.router.navigateByUrl('/coordinator/'+data.id+'/home'); window.alert("Logged In successfully!")},
        error => { console.log('Error: ', error); sessionStorage.setItem('token',''); window.alert("Login Failed")}
        );
      }
      else{
       window.alert("Empty Fields or Email format!");
      }
    // console.log(this.current.username,this.current.password,this.selectedTab);
   }
  ngOnInit(): void {
    // this.selectedTab = tabs.findIndex(tab => tab.active);
  }
  tabChanged(event:any) {
    this.current.password="";
    this.current.username="";
    }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

export class StudentUser {
  constructor(
    public rollno: string = '',
    public email: string = '',
    public password: string = '',
  ){}
}
export class RecruiterUser {
  constructor(
    public name: string = '',
    public email: string = '',
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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  constructor( private http: HttpClient, private fb: FormBuilder, private router: Router ) { }
  currentstudent : StudentUser = new StudentUser();
  currentrecruiter: RecruiterUser = new RecruiterUser();
  private base_url: string = 'http://localhost:5000/auth/';
  student = this.fb.group({
    rollno: [, [Validators.required]],
    email: [,[Validators.email]],
    password: [, [Validators.required]],
  });
  recruiter = this.fb.group({
    name : [,Validators.required],
    email: [,[Validators.email]],
    password: [, [Validators.required]],
  });
  ngOnInit(): void {
    
  }
  onSubmitStudent(){
    if(this.student.valid){
      this.http.post<loggedin>(this.base_url + 'student/signup', JSON.stringify(this.currentstudent), {'headers': { 'content-type': 'application/json' }})
      .subscribe(
        data => {console.log('User', data); sessionStorage.setItem('token',data.token); this.router.navigateByUrl('/login'); window.alert("Signed Up successfully!");},
        error => { console.log('Error: ', error) ; sessionStorage.setItem('token',''); window.alert("Sign up Failed");}
        );
      }
      else{
       window.alert("Empty Fields!");
      }
  }
  onSubmitRecruiter(){
    if(this.recruiter.valid){
      this.http.post<loggedin>(this.base_url + 'recruiter/signup', JSON.stringify(this.currentrecruiter), {'headers': { 'content-type': 'application/json' }})
      .subscribe(
        data => {console.log('User', data);sessionStorage.setItem('token',data.token); this.router.navigateByUrl('/login'); window.alert("Signed Up successfully!");},
        error => { console.log('Error: ', error);sessionStorage.setItem('token',''); window.alert("Sign up Failed");}
        );
      }
      else{
       window.alert("Empty Fields or Email format!");
      }
  }


}

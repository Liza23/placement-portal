import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

export class Recruiter {
  constructor(
    public recruiter_name: string = '',
    public recruiter_email: string = '',
    public recruiter_contact: number = 0,
  ){}
}

@Component({
  selector: 'app-recruiter-info',
  templateUrl: './recruiter-info.component.html',
  styleUrls: ['./recruiter-info.component.css']
})
export class RecruiterInfoComponent implements OnInit {

  user = this.fb.group({
    recruiter_name: [, [Validators.required]],
    recruiter_email: [,[Validators.required]],
    recruiter_contact: [,[Validators.required]],
  });
  
  recruiter_id: any;
  recruit: Recruiter = new Recruiter();
  private base_url: string = 'http://localhost:5000/';
  
  constructor(private http: HttpClient, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.recruiter_id = params.get('recruiter_id');
      this.getDetails();
    })
  }

  getDetails() {
    this.http.get<any>(this.base_url + 'recruiter/view_recuriter_profile/' + this.recruiter_id).subscribe(
      response => {
        console.log(response[0]);
        this.recruit = response[0];
      },
    );
  }

  onSubmit() {
    if(this.user.valid){
      this.updateDetails(this.recruit)
      .subscribe(
        data => {console.log(data), window.alert("Submitted successfully!")},
        error => { console.log('Error: ', error) , window.alert("Invalid Data! Please enter correct information.")}
        );
      }
      else{
       window.alert("Submission failed!");
      }
  }

  updateDetails(recruit: Recruiter):Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(recruit);
    return this.http.post<Recruiter>(this.base_url + 'edit_recruiter_profile', body, {'headers': headers});
  }

}

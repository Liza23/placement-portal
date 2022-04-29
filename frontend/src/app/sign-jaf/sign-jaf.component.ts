import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

export class Applies_For {
  constructor(
    public student_rno: number = 0,
    public jaf_id: number = 0,
    public resume_id: number = 0
  ){}
}

export class Resume {
  constructor(
    resume_id: number = 0,
    resume_url: string = ''
  ){}
}

@Component({
  selector: 'app-sign-jaf',
  templateUrl: './sign-jaf.component.html',
  styleUrls: ['./sign-jaf.component.css']
})
export class SignJafComponent implements OnInit {

  user = this.fb.group({
    resume_id: [,[Validators.required]],
  });

  student_rno: any;
  jaf_id: any;
  resume_id: any;
  applied: Applies_For = new Applies_For();
  resumes: Resume[] = [];

  private base_url: string = 'http://localhost:8081/students/';

  constructor(private http: HttpClient, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.student_rno = params.get('student_rno');
      this.jaf_id = params.get('jaf_id');
      this.getResumes();
    })
  }

  getResumes() {
    this.http.get<any>(this.base_url + '' + this.student_rno + '/resumes').subscribe(
      response => {
        console.log(response);
        this.resumes = response;
      },
    );
  }

  onSubmit() {
    if(this.user.valid){
      this.updateDetails(this.applied)
      .subscribe(
        data => {console.log(data), window.alert("Signed successfully!")},
        error => { console.log('Error: ', error) , window.alert("Invalid Data! Please enter correct information.")}
        );
      }
      else{
       window.alert("Signing for the JAF failed!");
      }
  }

  updateDetails(applied: Applies_For) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(applied);
    console.log(body);
    return this.http.post<Applies_For>(this.base_url + '' + this.student_rno + '/jafs/' + this.jaf_id + '/sign', body, {'headers': headers});
  }

}

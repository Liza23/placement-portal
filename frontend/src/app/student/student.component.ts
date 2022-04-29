import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';

export class Student {
  constructor(
    public student_rno: number = 0,
    public student_password: string = '',
    public student_name: string = '',
    public student_gender: string = '',
    public student_dob: Date = new Date(),
    public student_email: string = '',
    public student_contact: string = '',
    public year_of_enrollment: number = 0,
    public student_current_year: number = 0,
    public student_cpi: number = 0,
    public student_incentive_points: number = 0,
    public program_id: number = 0,
    public program_name: string = '',
    public department_id: number = 0,
    public department_name: string = '',
    public allocated_jaf: number = 0,
    public allocated_timestamp: Date = new Date()
  ){}
}

export class JAF {
  constructor(
    public jaf_id: number,
    public jaf_title: string,
    public profile_name: string,
    public company_id: number,
    public company_name: string,
    public jaf_opened_on: Date,
    public jaf_closed_on: Date,
  ){}
}

export class AppliedJaf {
  constructor(
    public jaf_id: number,
    public jaf_title: string,
    public profile_name: string,
    public company_id: number,
    public company_name: string,
    public jaf_signed_on: Date,
  ){}
}

export class Resume {
  constructor(
    public resume_id: number,
    public resume_url: string
  ){}
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  private base_url: string = 'http://localhost:5000/';
  p: number = 1;
  count: number = 50;
  p2: number = 1;
  count2: number = 50;
  student_rno: any;
  student: Student = new Student();
  open_jafs: JAF[] = [];
  elig_jafs: JAF[] = [];
  applied_jafs: AppliedJaf[] = [];
  elig_jaf_ids: number[] = [];
  applied_jaf_ids: number[] = [];
  resumes: Resume[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.student_rno = params.get('student_rno');
      this.getStudent();
      this.getResumes();
      this.getActiveJafs();
      this.getEligibleJafs();
      this.getAppliedJafs();
      })    
  }

  getStudent() {
    this.http.get<any>(this.base_url + 'view_student_profile/' + this.student_rno).subscribe(
      response => {
        console.log(response);
        this.student = response[0];
      }
    );
  }

  getResumes() {
    this.http.get<any>(this.base_url + 'students/' + this.student_rno + '/resumes').subscribe(
      response => {
        console.log(response);
        this.resumes = response;
      }
    );
  }

  getActiveJafs() {
    this.http.get<any>(this.base_url + '/student/open_jafs').subscribe(
      response => {
        console.log(response);
        this.open_jafs = response;
      },
    );
  }

  getEligibleJafs() {
    this.http.get<any>(this.base_url + 'open-jafs/' + this.student_rno).subscribe(
      response => {
        console.log(response);
        this.elig_jafs = response;
      },
    );
    for (let i=0; i<this.elig_jafs.length; i++) {
      this.elig_jaf_ids.push(this.elig_jafs[i].jaf_id);
    }
  }

  getAppliedJafs() {
    this.http.get<any>(this.base_url + 'students/' + this.student_rno + '/applied-jafs').subscribe(
      response => {
        console.log(response);
        this.applied_jafs = response;
      },
    );
    for (let i=0; i<this.applied_jafs.length; i++) {
      this.applied_jaf_ids.push(this.applied_jafs[i].jaf_id);
    }
  }
  
}

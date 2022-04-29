import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
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

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {

  user = this.fb.group({
    student_name: [, [Validators.required]],
    student_gender: [, [Validators.required]],
    student_dob: [, [Validators.required]],
    student_email: [, [Validators.required]],
    student_contact: [, [Validators.required]],
  });

  private base_url: string = 'http://localhost:5000/';
  doc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  student_rno: any;
  student: Student = new Student();

  constructor(private http: HttpClient, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.student_rno = params.get('student_rno');
      console.log(this.student_rno);
      this.getStudent();
      })    
  }

  getStudent() {
    this.http.get<any>(this.base_url + 'view_student_profile/' + this.student_rno).subscribe(
      response => {
        console.log(response);
        this.student = response;
      }
    );
  }

  onSubmit() {
    if(this.user.valid){
      this.updateDetails(this.student)
      .subscribe(
        data => {console.log(data), window.alert("Submitted successfully!")},
        error => { console.log('Error: ', error) , window.alert("Invalid Data! Please enter correct information.")}
        );
      }
      else{
       window.alert("Submission failed!");
      }
  }

  updateDetails(student: Student):Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(student);
    console.log(body);
    return this.http.post<Student>(this.base_url + '' + this.student_rno + '/details', body, {'headers': headers});
  }

}

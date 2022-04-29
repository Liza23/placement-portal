import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';

export class Student {
  constructor(
    public student_rno: number,
    public student_password: string,
    public student_name: string,
    public student_gender: string,
    public student_dob: Date,
    public student_email: string,
    public student_contact: string,
    public year_of_enrollment: number,
    public student_current_year: number,
    public student_cpi: number,
    public student_incentive_points: number,
    public program_id: number,
    public program_name: string,
    public department_id: number,
    public department_name: string,
    public allocated_jaf: number,
    public allocated_timestamp: Date
  ){}
}

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  department_id: any;
  department_name: string = '';
  placedStudents: Student[] = [];
  unplacedStudents: Student[] = [];
  p1: number = 1;
  count1: number = 50;
  p2: number = 1;
  count2: number = 50;
  
  private url: string = 'http://localhost:8081/depts/';

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.department_id = params.get('department_id');
      this.getPlacedStudents();
      this.getUnplacedStudents();
    })
  }

  getPlacedStudents() {
    this.http.get<any>(this.url + this.department_id + '/students-placed').subscribe(
      response => {
        console.log(response);
        this.placedStudents = response;
      }
    );
  }

  getUnplacedStudents() {
    this.http.get<any>(this.url + this.department_id + '/students-unplaced').subscribe(
      response => {
        console.log(response);
        this.unplacedStudents = response;
      }
    );
  }

}

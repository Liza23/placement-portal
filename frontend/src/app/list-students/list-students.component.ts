import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommunicationService } from '../communication.service';

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
    public program_name: string,
    public department_name: string,
    public allocated_jaf: number,
    public allocated_timestamp: Date
  ){}
}

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {

  student: Student[] = [];
  private list_students: string = 'http://localhost:8081/students';
  p: number = 1;
  count: number = 50;

  constructor(private http: HttpClient, private service: CommunicationService) { }

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent() {
    this.http.get<any>(this.list_students).subscribe(
      response => {
        console.log(response);
        this.student = response;
      }
    );
  }

}

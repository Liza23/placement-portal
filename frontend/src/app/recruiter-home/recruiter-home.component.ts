import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';

export class Company {
  constructor(
    public company_id: number = 0,
    public company_name: string = '',
    public company_origin: string = ''
  ){}
}

export class Recruiter {
  constructor(
    public recruiter_id: number = 0,
    public recruiter_name: string = '',
    public recruiter_email: string = '',
    public recruiter_contact: number = 0,
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

@Component({
  selector: 'app-recruiter-home',
  templateUrl: './recruiter-home.component.html',
  styleUrls: ['./recruiter-home.component.css']
})
export class RecruiterHomeComponent implements OnInit {

  recruiter_id: any;
  recruiter_name: any;
  company: Company = new Company();
  recruiters: Recruiter[] = [];
  jafs: JAF[] = [];
  private base_url: string = 'http://localhost:8081/';

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.recruiter_id = params.get('recruiter_id');
      this.getName();
      this.getCompany();
      this.getRecruiters();
      this.getJafs();
    })
  }

  getName() {
    this.http.get<any>(this.base_url + 'recruiters/' + this.recruiter_id + '/details').subscribe(
      response => {
        console.log(response);
        this.recruiter_name = response.name;
      },
    );
  }
  
  getCompany() {
    this.http.get<any>(this.base_url + 'recruiters/' + this.recruiter_id + '/firm').subscribe(
      response => {
        console.log(response);
        this.company = response;
      },
    );
  }

  getRecruiters() {
    this.http.get<any>(this.base_url + '/firms/' + this.company.company_id + '/recruiters').subscribe(
      response => {
        console.log(response);
        this.recruiters = response;
      },
    );
  }

  getJafs() {
    this.http.get<any>(this.base_url + '' + this.recruiter_id + '/firms/' + this.company.company_id + '/jafs').subscribe(
      response => {
        console.log(response);
        this.jafs = response;
      },
    );
  }

  deleteJaf(jaf_id: number) {
    this.http.delete(this.base_url + '' + this.recruiter_id + '/firms/' + this.company.company_id + '/jafs/' + jaf_id).subscribe(
        data => {
        console.log(data);
      }
    );
  }
  
}

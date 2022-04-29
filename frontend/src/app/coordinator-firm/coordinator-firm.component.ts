import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';

export class Company {
  constructor(
    public company_id: number = 0,
    public company_name: string = '',
    public company_origin: string = '',
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
    public jaf_status: string
  ){}
}

@Component({
  selector: 'app-coordinator-firm',
  templateUrl: './coordinator-firm.component.html',
  styleUrls: ['./coordinator-firm.component.css']
})
export class CoordinatorFirmComponent implements OnInit {

  p: number = 1;
  count: number = 10;
  coordinator_id: any;
  firm_id: any;
  company: Company = new Company();
  recruiters: Recruiter[] = [];
  jafs: JAF[] = [];
  private base_url: string = 'http://localhost:8081/coordinators/';

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.coordinator_id = params.get('coordinator_id');
      this.firm_id = params.get('firm_id');
      this.getCompanyDetails();
      this.getRecruiters();
      this.getJafs();
    })
  }

  getCompanyDetails() {
    this.http.get<any>(this.base_url + '' + this.coordinator_id + '/firms/' + this.firm_id).subscribe(
      response => {
        console.log(response);
        this.company = response;
      },
    );
  }

  getRecruiters() {
    this.http.get<any>(this.base_url + '' + this.coordinator_id + '/firms/' + this.firm_id + '/recruiters').subscribe(
      response => {
        console.log(response);
        this.recruiters = response;
      },
    );
  }

  getJafs() {
    this.http.get<any>(this.base_url + '' + this.coordinator_id + '/firms/' + this.firm_id + '/jafs').subscribe(
      response => {
        console.log(response);
        this.jafs = response;
      },
    );
  }

  deleteJaf(jaf_id: number) {
    this.http.delete(this.base_url + '' + this.coordinator_id + '/firms/' + this.firm_id + '/jafs' + jaf_id).subscribe(
        data => {
        console.log(data);
      }
    );
  }
  
}

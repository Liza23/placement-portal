import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';

export class Company {
  constructor(
    public company_id: number,
    public company_name: string,
    public company_origin: string
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
  selector: 'app-coordinator-home',
  templateUrl: './coordinator-home.component.html',
  styleUrls: ['./coordinator-home.component.css']
})
export class CoordinatorHomeComponent implements OnInit {

  p: number = 1;
  count: number = 10;
  coordinator_id: any;
  coordinator_name: any;
  companies: Company[] = [];
  open_jafs: JAF[] = [];
  private base_url: string = 'http://localhost:8081/';

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.coordinator_id = params.get('coordinator_id');
      this.getName();
      this.getCompanies();
      this.getActiveJafs();
    })
  }

  getName() {
    this.http.get<any>(this.base_url + 'coordinators/' + this.coordinator_id + '/details').subscribe(
      response => {
        console.log(response);
        this.coordinator_name = response.name;
      },
    );
  }
  
  getCompanies() {
    this.http.get<any>(this.base_url + 'coordinators/' + this.coordinator_id + '/firms').subscribe(
      response => {
        console.log(response);
        this.companies = response;
      },
    );
  }

  getActiveJafs() {
    this.http.get<any>(this.base_url + '/open-jafs').subscribe(
      response => {
        console.log(response);
        this.open_jafs = response;
      },
    );
  }
  
}

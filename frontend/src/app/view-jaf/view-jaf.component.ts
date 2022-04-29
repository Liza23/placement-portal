import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';

export class JAF {
  constructor(
    public jaf_id: number = 0,
    public profile_id: number = 0,
    public profile_name: string = '',
    public company_id: number = 0,
    public company_name: string = '',
    public jaf_jd: string = '',
    public jaf_bond_duration: number = 0,
    public jaf_location_of_posting: string = '',
    public jaf_currency: string = '',
    public jaf_ctc: number = 0,
    public jaf_gross: number = 0,
    public jaf_cpi: number = 0,
    public jaf_bonus_allowed: boolean = false,
    public jaf_opened_on: Date = new Date(),
    public jaf_closed_on: Date = new Date(),
    public jaf_slot: string = ''
  ){}
}

export class Eligible {
  constructor(
    public dept_id: number,
    public prog_id: number
  ){}
}

@Component({
  selector: 'app-view-jaf',
  templateUrl: './view-jaf.component.html',
  styleUrls: ['./view-jaf.component.css']
})
export class ViewJafComponent implements OnInit {

  jaf_id: any;
  jaf: JAF = new JAF();
  criterion: Eligible[] = [];
  depts: string[] = [];
  progs: string[] = [];
  isEligible: boolean[][] = new Array(24).fill(false).map(() => new Array(12).fill(false));
  private base_url: string = 'http://localhost:8081/';

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.jaf_id = params.get('jaf_id');
      this.getJafDetails();
      this.getAllDepts();
      this.getAllProgs();
      this.getCriterion();
    })
  }

  getJafDetails() {
    this.http.get<JAF>(this.base_url + 'jafs/' + this.jaf_id + '/view').subscribe(
      response => {
        console.log(response);
        this.jaf = response;
      },
    );
  }

  getAllDepts() {
    this.http.get<any>(this.base_url + '/depts').subscribe(
      response => {
        console.log(response);
        this.depts = response;
      },
    );
  }

  getAllProgs() {
    this.http.get<any>(this.base_url + '/progs').subscribe(
      response => {
        console.log(response);
        this.progs = response;
      },
    );
  }
  
  getCriterion() {
    this.http.get<any>(this.base_url + 'jafs/' + this.jaf_id + '/elig-crit').subscribe(
      response => {
        console.log(response);
        this.criterion = response;
      },
    );
    for (let e=0; e<this.criterion.length; e++) {
      this.isEligible[this.criterion[e].dept_id][this.criterion[e].prog_id] = true;
    }
  }

}

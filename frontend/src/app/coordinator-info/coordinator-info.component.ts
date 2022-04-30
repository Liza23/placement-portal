import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

export class Coordie {
  constructor(
    public coordinator_name: string = '',
    public coordinator_email: string = '',
    public coordinator_contact: number = 0,
  ){}
}

@Component({
  selector: 'app-coordinator-info',
  templateUrl: './coordinator-info.component.html',
  styleUrls: ['./coordinator-info.component.css']
})
export class CoordinatorInfoComponent implements OnInit {

  user = this.fb.group({
    coordinator_name: [, [Validators.required]],
    coordinator_email: [,[Validators.required]],
    coordinator_contact: [,[Validators.required]],
  });
  
  coordinator_id: any;
  coordie: Coordie = new Coordie();
  private base_url: string = 'http://localhost:5000/';
  
  constructor(private http: HttpClient, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.coordinator_id = params.get('coordinator_id');
      this.getDetails();
    })
  }

  getDetails() {
    this.http.get<any>(this.base_url + 'view_coordinator_profile/' + this.coordinator_id).subscribe(
      response => {
        console.log(response);
        this.coordie = response[0];
      },
    );
  }

  onSubmit() {
    if(this.user.valid){
      this.updateDetails(this.coordie)
      .subscribe(
        data => {console.log(data), window.alert("Submitted successfully!")},
        error => { console.log('Error: ', error) , window.alert("Invalid Data! Please enter correct information.")}
        );
      }
      else{
       window.alert("Submission failed!");
      }
  }

  updateDetails(coordie: Coordie):Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(coordie);
    console.log(body);
    return this.http.post<Coordie>(this.base_url + 'edit_coordinator_profile', body, {'headers': headers});
  }

}

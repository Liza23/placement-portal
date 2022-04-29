import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

export class Slot {
  constructor(
    jaf_id: string = '',
    slot: number = 0
  ){}
}

@Component({
  selector: 'app-firm-slot',
  templateUrl: './firm-slot.component.html',
  styleUrls: ['./firm-slot.component.css']
})
export class FirmSlotComponent implements OnInit {

  user = this.fb.group({
    slot: [,[Validators.required]],
  });
  
  coordinator_id: any;
  jaf_id: any;
  slot: any;
  updatedSlot: any;
  assignedSlot: Slot = new Slot();
  private base_url: string = 'http://localhost:8081/jafs/';

  constructor(private http: HttpClient, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.coordinator_id = params.get('coordinator_id');
      this.jaf_id = params.get('jaf_id');
      this.getSlot();
    })
  }

  getSlot() {
    this.http.get<any>(this.base_url + '' + this.jaf_id + '/slot').subscribe(
      response => {
        console.log(response);
        this.slot = response;
      },
    );
  }

  onSubmit() {
    if(this.user.valid){
      this.updateDetails(this.updatedSlot)
      .subscribe(
        data => {console.log(data), window.alert("Slot assigned successfully!")},
        error => { console.log('Error: ', error) , window.alert("Invalid Data! Please enter correct information.")}
        );
      }
      else{
       window.alert("Assigning slot failed!");
      }
  }

  updateDetails(slot: number) {
    slot = this.updatedSlot;
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(slot);
    console.log(body);
    return this.http.post<number>(this.base_url + '' + this.jaf_id + '/slot', body, {'headers': headers});
  }


}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({"Content-type": "application-json"}),
}

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private http: HttpClient, private router: Router) { }

  handleError(error: any) {
    let errorMessage = '';
 
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`; 
    }
    else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}

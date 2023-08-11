import { Injectable, reflectComponentType } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


//import{GetAllEmployeeResponse} from '../Models/api-models/getallstudentresponse.models'

@Injectable({
  providedIn: 'root',
})
export class loginService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);

  public isLoggedIn$ = this.isLoggedIn.asObservable();
  baseApiUrl: string = 'http://localhost:5078/';

  constructor(private httpClient: HttpClient) {}


  SignUpUser(user: any) {
    return this.httpClient.post(
      this.baseApiUrl + 'api/Login/',
      {
        Username: user[0],
        Email: user[1],
        Password: user[2],
      },
      {
        responseType: 'text',
      }
    );
  }
  login(model: any) {
    return this.httpClient.get(this.baseApiUrl + 'api/Login', model);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
}


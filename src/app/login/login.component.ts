import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { loginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  model: any = {};
  responsedata: any;
  Isloggedin = false;
  

  //isUserValid: boolean | undefined;
  hide = true;
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  loginAuth: any;
  emailservice: any;

  constructor(
    private loginservice: loginService,
    private _router: Router
    // private emailservice: ResetPasswordService
  ) { }

  loginUser() {
    this.loginservice.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log(response);
        if (response != null) {
          this.responsedata = response;
        }
        this.Isloggedin = true;
      },
      error: err => {

        if (err.status == 400) {
          Swal.fire({
            icon: 'error',
            title: 'Invalid Details',
            text: 'Username or Password or Role is incorrect!'
          }).then((okay) => {
            if (okay) {
              this._router.navigate(['']);
              this.loginForm.reset();
            }
          })
        }
      }
    });
  }
  ngOnInit(): void { }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
    department: new FormControl('', [Validators.required,])
  });

  get Username(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }
  get Password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}

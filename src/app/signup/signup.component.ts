import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { loginService} from '../service/login.service';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  repeatPass: string = 'none';
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  displayMsg: string = '';
  isAccountCreated: boolean = false;
  hide = true;
  constructor(
    private loginservice: loginService,
    private _router: Router
  ) {}
  ngOnInit(): void {}
  navigateToFirst() {
    this._router.navigate(['']);
  }
  SignUpForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z].*'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
    rpwd: new FormControl(''),
  });

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  get UserName(): FormControl {
    return this.SignUpForm.get('username') as FormControl;
  }
  get Email(): FormControl {
    return this.SignUpForm.get('email') as FormControl;
  }
  get Password(): FormControl {
    return this.SignUpForm.get('password') as FormControl;
  }
  get RPWD(): FormControl {
    return this.SignUpForm.get('rpwd') as FormControl;
  }
  

  SignUpSubmited() {

    if (this.Password.value == this.RPWD.value) {
      console.log(this.SignUpForm.valid);
      this.repeatPass = 'none';
      console.log(this.SignUpForm.value);
      this.loginservice
        .SignUpUser([
          this.SignUpForm.value.username,
          this.SignUpForm.value.email,
          this.SignUpForm.value.password
        ])
        .subscribe((res) => {
          if (res == 'Success') {
            alert('Account created successfully');
            this.isAccountCreated = true;
            this._router.navigate(['']);
          } else if (res == 'Already Exists') {
            alert('Account Already Exist. Try another user');
            this.isAccountCreated == false;
          } else {
            alert('Something went wrong');
            this.isAccountCreated = false;
          }
          console.log(res);
        });
    } else {
      this.repeatPass = 'inline';
    }
  }
}


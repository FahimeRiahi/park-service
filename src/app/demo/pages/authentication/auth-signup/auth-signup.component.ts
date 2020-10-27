import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth-signin/auth.service";
import {ToastService} from "../../../../services/toast.service";

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export class AuthSignupComponent implements OnInit {
  form: FormGroup;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              protected toast: ToastService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.minLength(3), Validators.maxLength(50), Validators.required]],
      password: ['', [Validators.minLength(6), Validators.maxLength(50), Validators.required]],
      firstName: ['', [Validators.minLength(5), Validators.maxLength(50)]],
      lastName: ['', [Validators.minLength(5), Validators.maxLength(50)]],
    });
  }

  signUp() {
    if (!this.form.valid) {
      this.toast.error('Email or Password is Invalid');
      return;
    }
    this.authService.signup(this.form.value).subscribe((result: any) => {
      this.toast.success('sign up successful');
    }, (error) => {
      this.toast.error('Network Error!');
    });

  }

}

import {Component, OnInit} from '@angular/core';
import {GC_AUTH_TOKEN, GC_USER, GC_USER_ID} from '../../../../configuration/config';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastService} from '../../../../services/toast.service';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {


  form: FormGroup;

  constructor(private router: Router,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              protected toast: ToastService,
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.minLength(4), Validators.maxLength(50), Validators.required]],
      password: ['', [Validators.minLength(6), Validators.maxLength(50), Validators.required]]
    });
  }

  confirm() {
    if (!this.form.valid) {
      this.toast.error('Username or Password is Invalid');
      return;
    }
    this.authService.login(this.form.value).subscribe((result: any) => {
      const user = result.data.login.user;
      const token = result.data.login.token;
      this.saveUserData(user, token);
      this.router.navigate(['/']);
    }, (error) => {
      this.toast.error(error);
    });

  }

  saveUserData(user, token) {
    localStorage.setItem(GC_USER, JSON.stringify(user));
    localStorage.setItem(GC_USER_ID, user.id);
    localStorage.setItem(GC_AUTH_TOKEN, token);
    this.authService.setUserId(user.id);
  }
}

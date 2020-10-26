import {Component, OnInit} from '@angular/core';
import {GC_AUTH_TOKEN, GC_USER_ID} from '../../../../configuration/config';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {Apollo} from 'apollo-angular';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {

  email = '';
  password = '';
  name = '';

  constructor(private router: Router,
              private authService: AuthService,
              private apollo: Apollo) {
  }

  ngOnInit() {
  }

  confirm() {
    // this.apollo.mutate({
    //   mutation: SIGNIN_USER_MUTATION,
    //   variables: {
    //     email: this.email,
    //     password: this.password
    //   }
    // }).subscribe((result) => {
    //   const id = result.data.signinUser.user.id;
    //   const token = result.data.signinUser.token;
    //   this.saveUserData(id, token);
    //
    //   this.router.navigate(['/']);
    //
    // }, (error) => {
    //   alert(error);
    // });

  }

  saveUserData(id, token) {
    localStorage.setItem(GC_USER_ID, id);
    localStorage.setItem(GC_AUTH_TOKEN, token);
    this.authService.setUserId(id);
  }
}

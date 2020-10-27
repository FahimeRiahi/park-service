import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {GC_AUTH_TOKEN, GC_USER_ID} from '../../../../configuration/config';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId: string = null;

  private _isAuthenticated = new BehaviorSubject(false);
  mutation = gql`
    mutation login($email: String! , $password : String!) {
      login(email: $email, password:$password) {
        user{
        id
        email
        first_name
        last_name
        }
        token
        }
    }
  `;
  sigUpMutation = gql`
    mutation signup($email: String! , , $password : String! , $first_name:String , $last_name:String) {
      signup(email:$email , password:$password,  first_name:$first_name , last_name:$last_name) {
        user{
        id
        email
        }
        token
        }
    }
  `;

  constructor(private apollo: Apollo) {
  }

  get isAuthenticated(): Observable<any> {
    return this._isAuthenticated.asObservable();
  }

  saveUserData(id: string, token: string) {

    localStorage.setItem(GC_USER_ID, id);
    localStorage.setItem(GC_AUTH_TOKEN, token);
    this.setUserId(id);
  }

  setUserId(id: string) {
    this.userId = id;

    this._isAuthenticated.next(true);
  }

  login(model: any) {
    return this.apollo.mutate({
      mutation: this.mutation,
      variables: {
        email: model.email,
        password: model.password
      }
    });
  }

  signup(model: any) {
    return this.apollo.mutate({
      mutation: this.sigUpMutation,
      variables: {
        email: model.email,
        password: model.password,
        first_name: model.firstName,
        last_name: model.lastName,
      }
    });
  }

  logout() {
    localStorage.removeItem(GC_USER_ID);
    localStorage.removeItem(GC_AUTH_TOKEN);
    this.userId = null;

    this._isAuthenticated.next(false);
  }

  autoLogin() {
    const id = localStorage.getItem(GC_USER_ID);

    if (id) {
      this.setUserId(id);
    }
  }
}

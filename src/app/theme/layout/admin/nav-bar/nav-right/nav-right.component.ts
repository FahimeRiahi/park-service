import {Component, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {GC_AUTH_TOKEN, GC_USER, GC_USER_ID} from '../../../../../configuration/config';
import {User} from '../../../../../shared/user.interface';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit {
  currentUser: User;

  constructor(public router: Router,
  ) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user')) as User;
  }

  onLoggedOut() {
    localStorage.removeItem(GC_USER_ID);
    localStorage.removeItem(GC_USER);
    localStorage.removeItem(GC_AUTH_TOKEN);
    sessionStorage.clear();
    this.router.navigate(['/auth/signin']);
  }
}

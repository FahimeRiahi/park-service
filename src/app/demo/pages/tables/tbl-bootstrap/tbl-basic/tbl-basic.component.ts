import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Subscription} from 'rxjs';
import gql from 'graphql-tag';
import {Users, User} from '../../../../../shared/user.interface';

@Component({
  selector: 'app-tbl-basic',
  templateUrl: './tbl-basic.component.html',
  styleUrls: ['./tbl-basic.component.scss']
})
export class TblBasicComponent implements OnInit {
  cols: any[];
  usr: User[];
  userSubscription: Subscription;
  p = 1;
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'username'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.userSubscription = this.apollo.watchQuery<Users>({
      query: gql`
         query Users {
           users {
           id
           first_name
           last_name
           username
           }
         }
       `
    }).valueChanges
      .subscribe(({data, loading}) => {
        this.usr = data.users;
      });

  }
}


import {Component, OnInit, ViewChild} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Subscription} from 'rxjs';
import gql from 'graphql-tag';
import {User, Users} from '../../../../../shared/user.interface';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ToastService} from "../../../../../services/toast.service";

@Component({
  selector: 'app-tbl-basic',
  templateUrl: './tbl-basic.component.html',
  styleUrls: ['./tbl-basic.component.scss']
})
export class TblBasicComponent implements OnInit {
  usr: MatTableDataSource<User>;
  userSubscription: Subscription;
  p = 1;
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private apollo: Apollo, public toastEvent: ToastService) {
  }

  ngOnInit() {
    this.userSubscription = this.apollo.watchQuery<Users>({
      query: gql`
         query Users {
           users {
           id
           first_name
           last_name
           email
           }
         }
       `
    }).valueChanges
      .subscribe(({data, loading}) => {
        if (data.users) {
          this.usr = new MatTableDataSource(data.users);
          this.usr.paginator = this.paginator;
        } else {
          this.toastEvent.info('Network Error!');
        }


      });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usr.filter = filterValue.trim().toLowerCase();
  }
}


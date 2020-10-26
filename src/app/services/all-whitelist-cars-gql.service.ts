import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';
import {Car, WhitelistCars} from '../shared/whitelist-car.interface';

@Injectable({
  providedIn: 'root',
})
export class AllWhitelistCarsGQLService extends Query<WhitelistCars> {
  document = gql`
    query WhitelistCars {
      whitelistCars {
        id
        license_plate
        allowed_from_date
        allowed_to_date
        allowed_time_from
        allowed_time_to
        }
    }
  `;
}

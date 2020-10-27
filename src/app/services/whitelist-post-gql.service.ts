import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class WhitelistPostGQLService {
  mutation = gql`
    mutation newWhitelistCar($license_plate: String! , $allowed_from_date : String! ,$allowed_to_date: String! ,$allowed_time_from: String!, $allowed_time_to: String! ) {
      newwhitelistcar(license_plate: $license_plate, allowed_from_date:$allowed_from_date , allowed_to_date: $allowed_to_date ,allowed_time_from: $allowed_time_from ,allowed_time_to: $allowed_time_to ) {
        whitelistCar{
        license_plate
        allowed_from_date
        allowed_to_date
        allowed_time_from
        allowed_time_to
        }
      }
    }
  `;

  constructor(private apollo: Apollo) {
  }

  newWhitelistCar(model: any) {
    return this.apollo.mutate({
      mutation: this.mutation,
      variables: {
        license_plate: model.licensePlate,
        allowed_from_date: model.allowedFromDate,
        allowed_to_date: model.allowedToDate,
        allowed_time_from: model.allowedTimeFrom,
        allowed_time_to: model.allowedTimeTo,
      }
    });
  }
}

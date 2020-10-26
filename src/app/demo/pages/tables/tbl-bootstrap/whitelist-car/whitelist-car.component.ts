import {Component, OnInit, ViewChild} from '@angular/core';
import {Car} from '../../../../../shared/whitelist-car.interface';
import {Apollo} from 'apollo-angular';
import {DatePipe} from '@angular/common';
import {WhitelistPostGQLService} from '../../../../../services/whitelist-post-gql.service';
import {AllWhitelistCarsGQLService} from '../../../../../services/all-whitelist-cars-gql.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ToastService} from '../../../../../theme/shared/components/toast/toast.service';


@Component({
  selector: 'app-whitelist-car',
  templateUrl: './whitelist-car.component.html',
  styleUrls: ['./whitelist-car.component.scss']
})
export class WhitelistCarComponent implements OnInit {
  carList: Car[];
  displayedColumns: string[] = ['license_plate', 'allowed_from_date', 'allowed_to_date', 'allowed_time_from', 'allowed_time_to'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  formGroup: FormGroup;
  @ViewChild('modalDefault', {static: true}) modalDefault;

  constructor(private apollo: Apollo,
              private datePipe: DatePipe,
              private whitelistPostGQLService: WhitelistPostGQLService,
              private allWhitelistCarsGQLService: AllWhitelistCarsGQLService,
              public toastEvent: ToastService) {
  }

  ngOnInit() {
    this.LoadWhitelistCars();
    this.initialForm();
  }

  public LoadWhitelistCars() {
    this.allWhitelistCarsGQLService.watch().valueChanges
      .subscribe(({data, loading}) => {
        this.carList = data.whitelistCars.map((x: any) => ({
          id: x.id,
          license_plate: x.license_plate,
          allowed_from_date: this.datePipe.transform(x.allowed_from_date),
          allowed_to_date: this.datePipe.transform(x.allowed_to_date),
          allowed_time_from: x.allowed_time_from,
          allowed_time_to: x.allowed_time_to
        }));
      });
  }

  private initialForm() {
    this.formGroup = new FormGroup({
      id: new FormControl(),
      licensePlate: new FormControl(),
      allowedFromDate: new FormControl(),
      allowedToDate: new FormControl(),
      allowedTimeFrom: new FormControl(),
      allowedTimeTo: new FormControl(),
    });
  }

  public addNewCarToWhitelist() {
    const model = this.formGroup.value;
    this.whitelistPostGQLService.newWhitelistCar(model)
      .subscribe(({data}) => {
        this.LoadWhitelistCars();
        this.modalDefault.hide();
        this.toastEvent.toast({uid: 'Success' , delay: 5000});
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
  }

}




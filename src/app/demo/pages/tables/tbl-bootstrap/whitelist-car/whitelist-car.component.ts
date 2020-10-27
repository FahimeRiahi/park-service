import { Component, OnInit, ViewChild} from '@angular/core';
import {Car} from '../../../../../shared/whitelist-car.interface';
import {Apollo} from 'apollo-angular';
import {DatePipe} from '@angular/common';
import {WhitelistPostGQLService} from '../../../../../services/whitelist-post-gql.service';
import {AllWhitelistCarsGQLService} from '../../../../../services/all-whitelist-cars-gql.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastService} from '../../../../../services/toast.service';
import * as moment from 'moment';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-whitelist-car',
  templateUrl: './whitelist-car.component.html',
  styleUrls: ['./whitelist-car.component.scss']
})
export class WhitelistCarComponent implements OnInit  {
  carList: MatTableDataSource<Car>
  displayedColumns: string[] = ['license_plate', 'allowed_from_date', 'allowed_to_date', 'allowed_time_from', 'allowed_time_to'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  formGroup: FormGroup;
  @ViewChild('modalDefault', {static: true}) modalDefault;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private apollo: Apollo,
              private datePipe: DatePipe,
              private whitelistPostGQLService: WhitelistPostGQLService,
              private allWhitelistCarsGQLService: AllWhitelistCarsGQLService,
              public toastEvent: ToastService,
              private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.LoadWhitelistCars();
    this.initialForm();
  }

  public LoadWhitelistCars() {
    this.allWhitelistCarsGQLService.watch().valueChanges
      .subscribe(({data, loading}) => {
        this.carList = new MatTableDataSource( data.whitelistCars.map((x: any) => ({
          id: x.id,
          license_plate: x.license_plate,
          allowed_from_date: this.datePipe.transform(x.allowed_from_date),
          allowed_to_date: this.datePipe.transform(x.allowed_to_date),
          allowed_time_from: x.allowed_time_from,
          allowed_time_to: x.allowed_time_to
        })));
        this.carList.paginator = this.paginator;

      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.carList.filter = filterValue.trim().toLowerCase();
  }

  private initialForm() {
    this.formGroup = this.formBuilder.group({
      id: [''],
      licensePlate: ['', [Validators.required]],
      allowedFromDate: [new Date(), Validators.required],
      allowedToDate: ['', Validators.required],
      allowedTimeFrom: [moment(new Date()).format('HH:mm'), Validators.required],
      allowedTimeTo: ['', Validators.required],
    });
  }

  public addNewCarToWhitelist() {
    if (!this.formGroup.valid) {
      this.toastEvent.error('Fill required fields');
      return;
    }
    const model = this.formGroup.value;

    if (model.allowedFromDate.getTime() > model.allowedToDate.getTime()) {
      this.toastEvent.info('Allowed from date should be less than allowed to date');
      return;
    }
    const start = new Date('1970-01-01T' + model.allowedTimeFrom + 'Z').getTime();
    const end = new Date('1970-01-01T' + model.allowedTimeTo + 'Z').getTime();
    if (start > end) {
      this.toastEvent.info('Start time should be less than end time');
      return;
    }


    this.whitelistPostGQLService.newWhitelistCar(model)
      .subscribe(({data}) => {
        this.LoadWhitelistCars();
        this.modalDefault.hide();
        this.toastEvent.success('Add done successfully.');
      }, (error) => {
        this.toastEvent.error(error);
      });
  }

}




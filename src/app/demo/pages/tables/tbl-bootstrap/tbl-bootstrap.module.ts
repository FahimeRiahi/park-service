import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import {TblBootstrapRoutingModule} from './tbl-bootstrap-routing.module';
import {SharedModule} from '../../../../theme/shared/shared.module';
import { WhitelistCarComponent} from './whitelist-car/whitelist-car.component';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
  imports: [
    CommonModule,
    TblBootstrapRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    NgxMaterialTimepickerModule,
    MatPaginatorModule,
    CdkTableModule
  ],
  declarations: [WhitelistCarComponent],
  providers: [DatePipe]
})
export class TblBootstrapModule {
}

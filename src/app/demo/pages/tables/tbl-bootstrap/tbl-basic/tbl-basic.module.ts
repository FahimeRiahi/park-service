import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TblBasicRoutingModule} from './tbl-basic-routing.module';
import {TblBasicComponent} from './tbl-basic.component';
import {SharedModule} from '../../../../../theme/shared/shared.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [TblBasicComponent],
  imports: [
    CommonModule,
    TblBasicRoutingModule,
    SharedModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class TblBasicModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../../theme/shared/shared.module';

import { AuthSigninRoutingModule } from './auth-signin-routing.module';
import { AuthSigninComponent } from './auth-signin.component';

@NgModule({
  imports: [
    CommonModule,
    AuthSigninRoutingModule,
    SharedModule
  ],
  declarations: [AuthSigninComponent]
})
export class AuthSigninModule { }

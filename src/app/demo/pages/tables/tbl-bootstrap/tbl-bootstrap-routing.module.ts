import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WhitelistCarComponent } from './whitelist-car/whitelist-car.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'bt-basic',
        loadChildren: () => import('./tbl-basic/tbl-basic.module').then(module => module.TblBasicModule)
      },
      {
        path: 'whitelist-car',
        component: WhitelistCarComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TblBootstrapRoutingModule { }

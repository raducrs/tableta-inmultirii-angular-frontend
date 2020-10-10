import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ThankYouComponent} from './thank-you/thank-you.component';

const routes: Routes = [
  {
    path: ':donationId/c/:activationCode',
    component: ThankYouComponent,
    data: { title: 'Tableta Inmultirii - Confirmare' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmationRoutingModule {}

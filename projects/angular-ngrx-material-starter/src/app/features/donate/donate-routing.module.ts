import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonateComponent } from './donate/donate.component';
import {ThankYouComponent} from './thank-you/thank-you.component';

const routes: Routes = [
  {
    path: 'thank-you',
    component: ThankYouComponent,
    data: { title: 'Multumim' }
  },
  {
    path: '',
    component: DonateComponent,
    pathMatch: 'full',
    data: { title: 'Vreau sa ma implic' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonateRoutingModule {}

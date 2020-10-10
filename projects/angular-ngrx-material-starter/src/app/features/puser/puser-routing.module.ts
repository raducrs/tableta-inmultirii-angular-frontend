import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './account/account.component';
import {AcceptedDisplayComponent} from './accepted-display/accepted-display.component';
import {ContactDisplayComponent} from './contact-display/contact-display.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    data: { title: 'Management' }
  },
  {
    path: 'test',
    component: ContactDisplayComponent,
    data: { title: 'Management' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PuserRoutingModule {}

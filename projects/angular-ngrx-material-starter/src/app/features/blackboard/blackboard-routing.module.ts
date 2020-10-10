import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {UploadComponent} from './upload/upload.component';
import {ShareComponent} from './share/share.component';

const routes: Routes = [
  {
    path: 'customize',
    component: UploadComponent,
    data: { title: 'Crează și răspândește mesajul!' }
  },
  {
    path: 'me/:image',
    component: ShareComponent,
    data: { title: 'Crează și răspândește mesajul!' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlackboardRoutingModule {}

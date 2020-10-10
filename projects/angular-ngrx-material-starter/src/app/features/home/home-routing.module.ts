import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import {ContactComponent} from './contact/contact.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Tableta Inmultirii' }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { title: 'Tableta Inmultirii - Contact' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}

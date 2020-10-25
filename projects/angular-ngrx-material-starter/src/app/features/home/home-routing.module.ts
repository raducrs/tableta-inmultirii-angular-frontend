import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import {ContactComponent} from './contact/contact.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Acasă - Tableta Înmulțirii' }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { title: 'Contact - Tableta Înmulțirii' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonateComponent } from './donate/donate.component';
import {ThankYouComponent} from './thank-you/thank-you.component';

const routes: Routes = [
  {
    path: 'thank-you',
    component: ThankYouComponent,
    data: { title: 'Mulțumim - Tableta Înmulțirii' }
  },
  {
    path: 'laptop',
    component: DonateComponent,
    pathMatch: 'full',
    data: { title: 'Donează laptop - Tableta Înmulțirii',
      description: 'Donează laptopul de care nu mai ai nevoie catre copiii școlari care au nevoie.'
    }
  },
  {
    path: 'tablet',
    component: DonateComponent,
    pathMatch: 'full',
    data: { title: 'Donează tableta - Tableta Înmulțirii',
      description: 'Donează tableta de care nu mai ai nevoie catre copiii școlari care au nevoie.'
    }
  },
  {
    path: 'phone',
    component: DonateComponent,
    pathMatch: 'full',
    data: { title: 'Donează telefonul - Tableta Înmulțirii',
      description: 'Donează telefonul de care nu mai ai nevoie catre copiii școlari care au nevoie.'
    }
  },
  {
    path: '',
    component: DonateComponent,
    pathMatch: 'full',
    data: { title: 'Donează laptopul, tableta sau telefonul - Tableta Înmulțirii',
            description: 'Donează laptopul, tableta sau telefonul de care nu mai ai nevoie catre copiii școlari care au nevoie.'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonateRoutingModule {}

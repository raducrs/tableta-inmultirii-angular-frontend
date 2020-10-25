import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {UploadComponent} from './upload/upload.component';
import {ShareComponent} from './share/share.component';

const routes: Routes = [
  {
    path: 'customize',
    component: UploadComponent,
    data: { title: 'Propria Tablă - Tableta Înmulțirii',
    description: 'Donează pe Tableta Înmulțirii pentru Educație digitală cu șanse egale! Contribuie și tu la răspândirea mesaju cu propria tablă desenată. Doneaza laptopul, tableta sau telefonul de care nu mai ai nevoie catre copiii scolari care au nevoie'
    }
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

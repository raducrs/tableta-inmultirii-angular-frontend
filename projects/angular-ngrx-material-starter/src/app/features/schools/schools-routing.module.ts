import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {GlobalComponent} from './global/global.component';

const routes: Routes = [
  {
    path: '',
    component: GlobalComponent,
    data: { title: 'Situația actualizată a școlilor - Tableta Înmulțirii' ,
      description: 'Prezentăm sinteza desfășurării orelor în unităților de învățământ preuniversitar conform raportărilor făcute de către Ministerul Educației și cercetării.\n' +
        '    Desfășurarea orelor în școli are loc conform celor 3 scenarii de prezentă fizică la școală a elevilor.'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolsRoutingModule {}

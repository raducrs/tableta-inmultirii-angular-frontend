import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartenerComponent } from './partener/partener.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {PConfirmComponent} from './p-confirm/p-confirm.component';
import {PwdResetComponent} from './pwd-reset/pwd-reset.component';

const routes: Routes = [
  {
    path: 'partner/sign-up',
    component: PartenerComponent,
    data: {
      title: 'Vreau sa mă implic ca partener - Tableta Inmulțirii',
           description: 'Inscrie-te ca si partener pentru a ajuta la distribuirea donatiilor si a ajunge la copiii care au nevoie.Doneaza laptopul, tableta sau telefonul de care nu mai ai nevoie catre copiii scolari care au nevoie.'
    }
  },
  {
    path: 'partner/confirm',
    component: PConfirmComponent,
    data: { title: 'Multumim! - Tableta Inmulțirii' }
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    data: { title: 'Intră in cont - Tableta Inmulțirii' }
  }, {
    path: 'pwd-reset',
    component: PwdResetComponent,
    data: { title: 'Reinitializare parola - Tableta Inmulțirii' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule {}

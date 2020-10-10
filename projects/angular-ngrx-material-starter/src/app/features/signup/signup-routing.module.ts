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
    data: { title: 'Vreau sa ma implic!' }
  },
  {
    path: 'partner/confirm',
    component: PConfirmComponent,
    data: { title: 'Vreau sa ma implic!' }
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    data: { title: 'Intra in cont' }
  }, {
    path: 'pwd-reset',
    component: PwdResetComponent,
    data: { title: 'Reinitializare parola' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { PartenerComponent } from './partener/partener.component';
import { SignupRoutingModule } from './signup-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import {PConfirmComponent} from './p-confirm/p-confirm.component';
import {PwdResetComponent} from './pwd-reset/pwd-reset.component';

@NgModule({
  declarations: [PartenerComponent, SignInComponent, PConfirmComponent, PwdResetComponent],
  imports: [CommonModule, SharedModule, SignupRoutingModule]
})
export class SignupModule {}

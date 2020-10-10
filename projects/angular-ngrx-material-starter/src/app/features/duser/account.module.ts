import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account/account.component';
import {Store, StoreModule} from '@ngrx/store';
import {DUSER} from './state/duser.selectors';
import {donationReducer} from './state/duser.reducers';
import {EffectsModule} from '@ngrx/effects';
import {DuserEffects} from './state/duser.effects';

@NgModule({
  declarations: [AccountComponent],
  imports: [CommonModule,
    SharedModule,
    AccountRoutingModule,
    StoreModule.forFeature(DUSER, donationReducer),
    EffectsModule.forFeature([DuserEffects])]
})
export class AccountModule {}

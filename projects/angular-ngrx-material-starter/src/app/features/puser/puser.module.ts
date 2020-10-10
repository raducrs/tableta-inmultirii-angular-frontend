import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { PuserRoutingModule } from './puser-routing.module';
import { AccountComponent } from './account/account.component';
import { StoreModule } from '@ngrx/store';
import {donationReducer} from './state/puser.reducers';
import {EffectsModule} from '@ngrx/effects';
import {PuserEffects} from './state/puser.effects';
import {PUSER} from './state/puser.selectors';
import { DisplayComponent } from './display/display.component';
import { TargetedComponent } from './targeted/targeted.component';
import {AcceptedComponent} from './accepted/accepted.component';
import {LocationComponent} from './location/location.component';
import {AcceptedDisplayComponent} from './accepted-display/accepted-display.component';
import { ContactDisplayComponent } from './contact-display/contact-display.component';

@NgModule({
  declarations: [AccountComponent, DisplayComponent, TargetedComponent, AcceptedComponent, LocationComponent, AcceptedDisplayComponent, ContactDisplayComponent],
  imports: [CommonModule,
    SharedModule,
    PuserRoutingModule,
    StoreModule.forFeature(PUSER, donationReducer),
    EffectsModule.forFeature([PuserEffects])]
})
export class PuserModule {}

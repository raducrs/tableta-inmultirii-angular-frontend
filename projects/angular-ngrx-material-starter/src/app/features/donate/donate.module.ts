import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { DonateComponent } from './donate/donate.component';
import { DonateRoutingModule } from './donate-routing.module';
import {AdaptableStepperComponent} from './donate/adaptable-stepper/adaptable-stepper.component';
import { UserTabComponent } from './donate/user-tab/user-tab.component';
import {GadgetTabComponent} from './donate/gadget-tab/gadget-tab.component';
import {LocationTabComponent} from './donate/location-tab/location-tab.component';
import {StoreModule} from '@ngrx/store';
import {DONATION} from './state/donation.selectors';
import {donationReducer} from './state/donation.reducers';
import {FinishTabComponent} from './donate/finish-tab/finish-tab.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import {EffectsModule} from '@ngrx/effects';
import {DonationEffects} from './state/donation.effects';

@NgModule({
  declarations: [
    DonateComponent,
    AdaptableStepperComponent,
    UserTabComponent,
    GadgetTabComponent,
    LocationTabComponent,
    FinishTabComponent,
    ThankYouComponent
  ],
  imports: [CommonModule,
    SharedModule,
    DonateRoutingModule,
    StoreModule.forFeature(DONATION, donationReducer),
    EffectsModule.forFeature([DonationEffects])
  ]
})
export class DonateModule {}

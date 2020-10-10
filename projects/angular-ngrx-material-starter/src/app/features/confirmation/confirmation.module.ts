import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';


import { ConfirmationRoutingModule } from './confirmation-routing.module';
import {ThankYouComponent} from './thank-you/thank-you.component';

@NgModule({
  declarations: [ThankYouComponent],
  imports: [CommonModule, SharedModule, ConfirmationRoutingModule]
})
export class ConfirmationModule {}

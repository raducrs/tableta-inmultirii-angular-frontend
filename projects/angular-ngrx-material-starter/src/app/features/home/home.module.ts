import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ContactComponent } from './contact/contact.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HOME } from './state/home.selectors';
import { homeReducer } from './state/home.reducers';
import { HomeEffects } from './state/home.effects';

@NgModule({
  declarations: [HomeComponent, ContactComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    StoreModule.forFeature(HOME, homeReducer),
    EffectsModule.forFeature([HomeEffects])
  ]
})
export class HomeModule {}

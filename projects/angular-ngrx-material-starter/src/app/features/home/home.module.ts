import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [HomeComponent, ContactComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule]
})
export class HomeModule {}

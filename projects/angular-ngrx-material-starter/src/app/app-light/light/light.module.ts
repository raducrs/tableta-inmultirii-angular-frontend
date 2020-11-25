import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightComponent } from './light/light.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LightComponent,
    data: { title: 'anms.menu.about' }
  }
];

@NgModule({
  declarations: [LightComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LightModule { }

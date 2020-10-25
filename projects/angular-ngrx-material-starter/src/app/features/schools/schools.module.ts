import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SchoolsRoutingModule} from './schools-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {GlobalComponent} from './global/global.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {SchoolsEffects} from './state/schools.effects';
import {schoolPointsReducer} from './state/schools.reducers';
import {SCHOOLS} from './state/schools.selectors';


@NgModule({
  declarations: [GlobalComponent],
  imports: [
    CommonModule,
    SharedModule,
    SchoolsRoutingModule,
    StoreModule.forFeature(SCHOOLS, schoolPointsReducer),
    EffectsModule.forFeature([SchoolsEffects]),
    NgxChartsModule,
  ]
})
export class SchoolsModule { }

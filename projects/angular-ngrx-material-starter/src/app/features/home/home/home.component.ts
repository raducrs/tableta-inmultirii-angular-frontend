import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import * as moment from 'moment';

import { select, Store } from '@ngrx/store';
import {
  selectGadgetStats,
  selectLatestSchoolPoint
} from '../state/home.selectors';
import {
  actionHomeLatestRetrieve,
  actionStatGadgetsRetrieve
} from '../state/home.actions';
import { HomeState } from '../state/home.model';

@Component({
  selector: 'anms-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HomeComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  // releaseButler = require('../../../../assets/release-butler.png').default;

  laptops = 1;
  tablets = 2;
  phones = 7;

  date: Date;
  red = 0;
  yellow = 0;
  green = 0;

  partners: any[];

  apiGateway = environment.apiGateway;

  constructor(
    private httpClient: HttpClient,
    private store: Store<HomeState>
  ) {}

  ngOnInit() {
    this.store.pipe(select(selectGadgetStats)).subscribe((data) => {
      if (data) {
        if (data.l) {
          this.laptops = data.l;
        }
        if (data.t) {
          this.tablets = data.t;
        }
        if (data.p) {
          this.phones = data.p;
        }
      }
    });

    this.httpClient.get<any[]>('assets/partners.json').subscribe((partners) => {
      this.partners = partners;
    });

    this.store.pipe(select(selectLatestSchoolPoint)).subscribe((data) => {
      if (data && data.stats && data.date) {
        this.convertTo(data);
      }
    });

    this.store.dispatch(actionStatGadgetsRetrieve());
    this.store.dispatch(actionHomeLatestRetrieve());
  }

  private convertTo(sdp) {
    this.date = this.converToDateobject(sdp.date);
    this.red = sdp.stats.red.count;
    this.yellow = sdp.stats.yellow.count;
    this.green = sdp.stats.green.count;
  }

  private converToDateobject(obj: any) {
    if (obj instanceof Date) {
      return obj;
    }
    if (obj.dayOfMonth) {
      return new Date(obj.year, obj.monthValue, obj.dayOfMonth, 12, 0, 0);
    }
    if (typeof obj === 'string' || obj instanceof String) {
      return moment(obj as string, 'YYYY-MM-DD').toDate();
    }

    return undefined;
  }
}

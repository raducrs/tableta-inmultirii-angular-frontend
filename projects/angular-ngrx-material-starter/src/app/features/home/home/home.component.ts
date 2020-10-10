import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {select} from '@ngrx/store';
import {selectLocation} from '../../donate/state/donation.selectors';

@Component({
  selector: 'anms-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HomeComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  // releaseButler = require('../../../../assets/release-butler.png').default;

  laptops = 11;
  tablets = 5;
  phones = 62;

  partners: any[];

  apiGateway = environment.apiGateway;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient.get<{l: number, t: number, p: number}>(`${this.apiGateway}/stats/gagdets`)
      .subscribe( data => {
        if (data){
          if (data.l){
            this.laptops = data.l
          }
          if (data.t){
            this.tablets = data.t
          }
          if (data.p){
            this.phones = data.p
          }
        }
      })

    this.httpClient.get<any[]>('assets/partners.json')
      .subscribe(partners => {
        this.partners = partners;
      })
  }
}

import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {ROUTE_ANIMATIONS_ELEMENTS} from '../../../core/core.module';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import * as moment from 'moment';

export interface SchoolStatistic{
  name: string;
  count: number;
}

export interface SchoolStatistics {
  red: SchoolStatistic;
  yellow: SchoolStatistic;
  green: SchoolStatistic;
}

export interface SchoolDataPoint {
  stats: SchoolStatistics;
  date: string;
}

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
  red = 0
  yellow = 0;
  green = 0;

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

    this.getLatestSchoolStatistics();
  }


  private getLatestSchoolStatistics(){
    this.getScenarioData().subscribe(data => {
      this.convertTo(data);
    }, err => {
      this.getScenarioDataStatic()
        .subscribe(d => {
          this.convertTo(d)
      })
    })
  }

  private getScenarioData(): Observable<SchoolDataPoint>{
    return this.httpClient.get<SchoolDataPoint>(`${this.apiGateway}/schools/latest`);
  }

  private getScenarioDataStatic(): Observable<SchoolDataPoint>{
    return this.httpClient.get<SchoolDataPoint>(`${this.apiGateway}/schools/datapoints/latest.json`);
  }

  private convertTo(sdp){
    this.date = this.converToDateobject(sdp.date)
    this.red = sdp.stats.red.count;
    this.yellow = sdp.stats.yellow.count;
    this.green = sdp.stats.green.count;
  }

  private converToDateobject(obj: any){

    if (obj instanceof Date){
      return obj;
    }
    if (obj.dayOfMonth) {
      return new Date(obj.year, obj.monthValue, obj.dayOfMonth, 12, 0, 0);
    }
    if (typeof obj === 'string' || obj instanceof String){
      return moment(obj as string, 'YYYY-MM-DD').toDate();
    }

    return undefined;
  }

}

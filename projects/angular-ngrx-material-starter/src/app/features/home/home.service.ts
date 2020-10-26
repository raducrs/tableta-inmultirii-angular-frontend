import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { PlatformService } from '../../core/ssr/platform.service';
import { Observable, of } from 'rxjs';
import { ScenarioData } from '../schools/scenario-data';
import { catchError, map } from 'rxjs/operators';
import { GadgetsStats, SchoolDataPoint } from './state/home.model';

export const LATEST_KEY = makeStateKey<ScenarioData>('latest');
export const LATEST_ETAG_KEY = makeStateKey<String>('latest-etag');

export const GADGETS_KEY = makeStateKey<ScenarioData>('gadgets');
export const GADGETS_ETAG_KEY = makeStateKey<String>('gadgets-etag');

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  apiGateway = environment.apiGateway;
  etagLatest: string;
  etagGadgets: string;

  constructor(
    private httpClient: HttpClient,
    private state: TransferState,
    private platformService: PlatformService
  ) {}

  public getLatest(): Observable<SchoolDataPoint> {
    const serverResponse: SchoolDataPoint = this.state.get<SchoolDataPoint>(
      LATEST_KEY,
      undefined
    );
    // after load from server rendered
    if (serverResponse) {
      // remove it to allow next calls to get fresh data
      this.state.remove(LATEST_KEY);
      console.log('serving from state latest');
      return of(serverResponse);
    } else {
      // recover etag from ssr
      if (!this.etagLatest) {
        this.etagLatest = this.state.get(LATEST_ETAG_KEY, undefined);
        console.log(
          'using etag from latest schools',
          this.state.get(LATEST_ETAG_KEY, undefined)
        );
      }
      // make http call allow for etag to be used
      return this.getScenarioDateHttp();
    }
  }

  private getScenarioDateHttp() {
    return this.httpClient
      .get<HttpResponse<SchoolDataPoint>>(`${this.apiGateway}/schools/latest`, {
        headers: {
          'If-None-Match': this.etagLatest ? this.etagLatest : ''
        },
        observe: 'response'
      })
      .pipe(
        map((res) => {
          if (res.headers && res.headers.get('ETag')) {
            this.etagLatest = res.headers.get('ETag');
          }
          if (!this.platformService.isBrowser) {
            this.state.set(LATEST_ETAG_KEY, res.headers.get('ETag'));
            this.state.set(
              LATEST_KEY,
              (res.body as unknown) as SchoolDataPoint
            );
          }
          return (res.body as unknown) as ScenarioData;
        }),
        catchError((err) => {
          if (err instanceof HttpErrorResponse && err.status === 304) {
            console.log('nothing changed latest etag');
            return of(null);
          } else {
            throw err;
          }
        })
      );
  }

  public getLatestStatic(): Observable<SchoolDataPoint> {
    return this.httpClient.get<SchoolDataPoint>(
      `${this.apiGateway}/schools/datapoints/latest.json`
    );
  }

  public getGadgets(): Observable<GadgetsStats> {
    const serverResponse: GadgetsStats = this.state.get<GadgetsStats>(
      GADGETS_KEY,
      undefined
    );
    // after load from server rendered
    if (serverResponse) {
      // remove it to allow next calls to get fresh data
      this.state.remove(GADGETS_KEY);
      console.log('serving from state gadgets');
      return of(serverResponse);
    } else {
      // recover etag from ssr
      if (!this.etagGadgets) {
        this.etagGadgets = this.state.get(GADGETS_ETAG_KEY, undefined);
        console.log(
          'using etag from latest schools',
          this.state.get(GADGETS_ETAG_KEY, undefined)
        );
      }
      // make http call allow for etag to be used
      return this.getGadgetsStatsHttp();
    }
  }

  private getGadgetsStatsHttp() {
    return this.httpClient
      .get<HttpResponse<GadgetsStats>>(`${this.apiGateway}/stats/gagdets`, {
        headers: {
          'If-None-Match': this.etagGadgets ? this.etagGadgets : ''
        },
        observe: 'response'
      })
      .pipe(
        map((res) => {
          if (res.headers && res.headers.get('ETag')) {
            this.etagGadgets = res.headers.get('ETag');
          }
          if (!this.platformService.isBrowser) {
            this.state.set(GADGETS_ETAG_KEY, res.headers.get('ETag'));
            this.state.set(GADGETS_KEY, (res.body as unknown) as GadgetsStats);
          }
          return (res.body as unknown) as ScenarioData;
        }),
        catchError((err) => {
          if (err instanceof HttpErrorResponse && err.status === 304) {
            console.log('nothing changed gadgets etag');
            return of(null);
          } else {
            throw err;
          }
        })
      );
  }

  public getGadgetsStatsStatic(): Observable<GadgetsStats> {
    return this.httpClient.get<GadgetsStats>(
      `${this.apiGateway}/stats/gadgets.json`
    );
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ScenarioData} from './scenario-data';
import {environment} from '../../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {makeStateKey, TransferState} from '@angular/platform-browser';

export const SCHOOLS_KEY = makeStateKey<ScenarioData>('schools');
export const SCHOOLS_ETAG_KEY = makeStateKey<String>('schools-etag');

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {

  apiGateway = environment.apiGateway;
  etag: string;

  constructor(private httpClient: HttpClient, private state: TransferState) { }

  public getScenarioData(): Observable<ScenarioData>{
    const serverResponse: ScenarioData = this.state.get<ScenarioData>(SCHOOLS_KEY, undefined);
    // after load from server rendered
    if (serverResponse){
      // remove it to allow next calls to get fresh data
      this.state.remove(SCHOOLS_KEY);
      return of(serverResponse);
    } else {
      // recover etag from ssr
      if (!this.etag){
        this.etag = this.state.get(SCHOOLS_ETAG_KEY, undefined);
      }
      // make http call allow for etag to be used
      return this.getScenarioDateHttp();
    }
  }

  private getScenarioDateHttp(){
    return this.httpClient.get<HttpResponse<ScenarioData>>(`${this.apiGateway}/schools`, {
      headers : {
        'If-None-Match': this.etag ? this.etag : ''
      },
      observe: 'response'
    }).pipe(
      map( res => {
        if (res.headers && res.headers.get('ETag')) {
          this.etag = res.headers.get('ETag');
        }
        return res.body as unknown as ScenarioData;
      })
    );
  }

  public getScenarioDataStatic(): Observable<ScenarioData>{
    return this.httpClient.get<ScenarioData>(`${this.apiGateway}/schools/datapoints/history.json`);
  }
}

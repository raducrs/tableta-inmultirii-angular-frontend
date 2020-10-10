import { Injectable } from '@angular/core';
import {Donation} from './state/donation.model';
import {Observable, of, throwError} from 'rxjs';
import {delay, map} from 'rxjs/operators';
import {CognitoUser} from '../../core/auth/auth.models';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  apiGateway = environment.apiGateway;

  constructor(private httpClient: HttpClient) { }

  post(donation: Donation, cognitoUser: CognitoUser): Observable<any> {
    if (donation.user.registeredUser) {
      return this.httpClient.post(`${this.apiGateway}/duser/${cognitoUser?.sub}/donations`, donation,
        {
          headers: {
            'Authorization': cognitoUser?.idToken ? cognitoUser.idToken : ''
          }
        })
    } else {
      return this.httpClient.post(`${this.apiGateway}/auser/donations`, donation)
    }
  }
}


import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {delay, map} from 'rxjs/operators';
import {Donation, DonationDetails} from './state/puser.model';
import {Laptop, LocationPacked, Phone} from '../donate/state/donation.model';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PuserService {

  counter = -1;

  apiGateway = environment.apiGateway;
  constructor(private httpClient: HttpClient) { }

  getDonations(cognitoUser): Observable<Donation[]> {
    return this.httpClient.get<{donations: Donation[]}>(`${this.apiGateway}/puser/${cognitoUser?.sub}/donations/targeted`,
      { headers: {
          'Authorization': cognitoUser?.idToken ? cognitoUser.idToken : ''
        }
      })
      .pipe(
        map( (response) =>  { if (response) { return response.donations} else { return [] }})
      )
  }

  getLocationDonations(cognitoUser): Observable<Donation[]> {
    return this.httpClient.get<{donations: Donation[]}>(`${this.apiGateway}/puser/${cognitoUser?.sub}/donations/location`,
      { headers: {
          'Authorization': cognitoUser?.idToken ? cognitoUser.idToken : ''
        }
      })
      .pipe(
        map( (response) =>  { if (response) { return response.donations} else { return [] }})
      )
  }

  getAcceptedDonations(cognitoUser): Observable<Donation[]> {
    return this.httpClient.get<{donations: Donation[]}>(`${this.apiGateway}/puser/${cognitoUser?.sub}/donations/accepted`,
      { headers: {
          'Authorization': cognitoUser?.idToken ? cognitoUser.idToken : ''
        }
      })
      .pipe(
        map( (response) =>  { if (response) { return response.donations} else { return [] }})
      )
  }
  acceptDonation(donation: Donation, cognitoUser): Observable<any> {
    return this.httpClient.post<{donations: Donation[]}>(`${this.apiGateway}/puser/${cognitoUser?.sub}/donations/accepted`,
      { donationId: donation.id},
      { headers: {
          'Authorization': cognitoUser?.idToken ? cognitoUser.idToken : ''
        }
      })
  }
  rejectDonation(donation: Donation): Observable<any> {
    return of({});
  }

  getADonationDetails(id: string, cognitoUser): Observable<DonationDetails>{
    return this.httpClient.get<DonationDetails>(`${this.apiGateway}/puser/${cognitoUser?.sub}/donations/${id}`,
      { headers: {
          'Authorization': cognitoUser?.idToken ? cognitoUser.idToken : ''
        }
      })
  }

  setADonationStatus(id: string, status: string, cognitoUser): Observable<any>{
    return this.httpClient.put<{ status: string}>(`${this.apiGateway}/puser/${cognitoUser?.sub}/donations/${id}`,
      { status },
      { headers: {
          'Authorization': cognitoUser?.idToken ? cognitoUser.idToken : ''
        }
      })
  }

  rejectADonation(id: string, cognitoUser): Observable<any>{
    return this.httpClient.delete<any>(`${this.apiGateway}/puser/${cognitoUser?.sub}/donations/${id}`,
      { headers: {
          'Authorization': cognitoUser?.idToken ? cognitoUser.idToken : ''
        }
      })
  }
}


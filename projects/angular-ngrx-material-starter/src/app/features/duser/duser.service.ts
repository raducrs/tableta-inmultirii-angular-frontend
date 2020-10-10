import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {delay, map} from 'rxjs/operators';
import {Donation} from './state/duser.model';
import {Laptop, LocationPacked} from '../donate/state/donation.model';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CognitoUser} from '../../core/auth/auth.models';

@Injectable({
  providedIn: 'root'
})
export class DUserService {

  apiGateway = environment.apiGateway;

  constructor(private httpClient: HttpClient) { }

  getDonations(cognitoUser: CognitoUser): Observable<Donation[]> {
    return this.httpClient.get<{donations: Donation[]}>(`${this.apiGateway}/duser/${cognitoUser?.sub}/donations`,
    // return this.httpClient.get<{donations: Donation[]}>(`${this.apiGateway}/duser/c9a290d9-0ecd-4315-b4ac-ef854c8a5caa/donations`,
    // return this.httpClient.get<{donations: Donation[]}>(`${this.apiGateway}/duser/e093df51-8d5d-4b8a-9f77-044bee30cabd/donations`,
      { headers: {
      'Authorization': cognitoUser?.idToken ? cognitoUser.idToken : ''
      // 'Authorization': 'eyJraWQiOiIzMGJCRlpSVUJBYTRrWjY0UXN3ZGZZY0ZOMnNQejhcL0tMVVBETDNmUEtrbz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjOWEyOTBkOS0wZWNkLTQzMTUtYjRhYy1lZjg1NGM4YTVjYWEiLCJhdWQiOiI3MTEwcTFwMWtrbmpoNzdtb21nNzRqMTF0YiIsImN1c3RvbTp1c2VyZ3JvdXAiOiJ1c2VyIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJldmVudF9pZCI6IjYyOTgwMmRjLTdiMTYtNDk3Yy05NzY3LWVjMTk1NGNlOWQ0OSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjAxNDc0Nzc0LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2V1LWNlbnRyYWwtMV9SZ3FUZTNlUDAiLCJjb2duaXRvOnVzZXJuYW1lIjoiYzlhMjkwZDktMGVjZC00MzE1LWI0YWMtZWY4NTRjOGE1Y2FhIiwiZXhwIjoxNjAxNDc4Mzc0LCJpYXQiOjE2MDE0NzQ3NzUsImVtYWlsIjoiakBrIn0.tswDmnM6Uj8R7Q7KrFCjG1FkrCTG8FbFtZj1t6_C0GgWISN2cT3gB1fVd_8Lt7mK0ATbo4bjCcIytNqRcLVAhAzp1Ks83rewESPAOoErBfQKcxR3E4qCHUxv3Q3ufedFJM1MnIwGt8aSxeaYTOitwGjzfVebJCMiVG-sQj0o4BegQe7YuNPBqeE3P6fnK_otwFGQ_2wR5p15AIuEdd4hTDBys0UsqZCmJhVQETIK4TsOycNKjmxgsLhRH5Ou6DkiL3Qjclm5m_UraajlclxXjMWhoqMYEkL5zlzD5QhIXkmtFdjBimVdAbz3KHTAaWWFnYPpMcIuLBFJPxqgNv-KaA'
        }
      })
      .pipe(
        map( (response) =>  { if (response) { return response.donations} else { return [] }})
      )

  }
}


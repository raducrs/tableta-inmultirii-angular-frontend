import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'anms-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ThankYouComponent implements OnInit {

  apiGateway = environment.apiGateway;

  error = false;
  success = false;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const donationId = this.route.snapshot.paramMap.get('donationId');
    const confirmationCode = this.route.snapshot.paramMap.get('activationCode');
    this.httpClient.get(`${this.apiGateway}/auser/donations/${donationId}/code/${confirmationCode}`)
      .subscribe( data => { this.success = true}, err => {this.error = true})
  }

}

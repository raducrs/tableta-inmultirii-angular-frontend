import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';

import {NotificationService, ROUTE_ANIMATIONS_ELEMENTS} from '../../../core/core.module';
import {DonationState, MakeModel} from '../../donate/state/donation.model';
import {icons} from '../../donate/donate/finish-tab/finish-tab.component';


@Component({
  selector: 'anms-puser-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AccountComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  donations: any[]

  constructor() {}

  ngOnInit() {

  }

}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';

import { Feature, features } from '../donate-list.data';

@Component({
  selector: 'anms-feature-list',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DonateComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  features: Feature[] = features;

  ngOnInit() {}

  openLink(link: string) {
    window.open(link, '_blank');
  }
}

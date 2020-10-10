import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThankYouComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

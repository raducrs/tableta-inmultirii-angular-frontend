import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

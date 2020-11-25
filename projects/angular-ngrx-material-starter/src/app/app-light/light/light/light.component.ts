import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LightComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

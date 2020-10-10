import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-thank-you',
  templateUrl: './p-confirm.component.html',
  styleUrls: ['./p-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PConfirmComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

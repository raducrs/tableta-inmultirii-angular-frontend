import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

declare var window: any;

export const variables = {
  a: 'contact',
  b: 'mailto',
  c: '@',
  d: 'gmail'
}

@Component({
  selector: 'anms-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit {

  notShown = true;
  email = '';

  constructor() { }

  ngOnInit(): void {
  }

  public showAddress(){
    this.notShown = false;
    let host: string = window.location.host;
    host = host.replace('www.','')
    this.email = variables['a'] + variables['c'] + host;
  }

}

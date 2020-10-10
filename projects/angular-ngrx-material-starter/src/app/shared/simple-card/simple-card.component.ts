import {Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'anms-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleCardComponent implements OnInit, OnChanges {

  @Input('icon') icon: string;
  @Input('title') title: string;
  @Input('subtitle') subtitle: string;
  @Input('status') status: string;
  @Input('sections') sections: { description: string[][], icon: string}[];

  statusColor = 'white';
  statusMessage = ''
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.status){
      this.setStatus(changes.status.currentValue);
    }
  }

  private setStatus(currentValue: string) {
    switch (currentValue){
      case 'open':
      case 'unclaimed':
        this.statusColor = 'orange';
        this.statusMessage = 'Trimis';
        break;
      case 'accepted':
      case 'contact-shown':
        this.statusColor = 'orange';
        this.statusMessage = 'Preluat';
        break;
      case 'contacted':
        this.statusColor = 'green';
        this.statusMessage = 'Contactat';
        break;
      case 'given':
        this.statusColor = 'green';
        this.statusMessage = 'Livrat';
        break;
      case 'rejected':
        this.statusColor = 'red';
        this.statusMessage = 'Respins';
        break;
      case 'unconfirmed':
        this.statusColor = 'red';
        this.statusMessage = 'Nevalidat';
        break;
      default:
        this.statusColor = 'white';
        this.statusMessage = '';
    }
  }
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Donation, DonationsState} from '../state/puser.model';
import {
  actionLDonationAccept, actionLDonationReject,
  actionLDonationsRetrieve,
  actionTDonationAccept,
  actionTDonationReject,
  actionTDonationsRetrieve
} from '../state/puser.actions';
import {selectLAllDonations, selectLError, selectTAllDonations, selectTError} from '../state/puser.selectors';
import {NotificationService} from '../../../core/notifications/notification.service';
import {gadgetNames} from '../display/display.component';


@Component({
  selector: 'anms-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LocationComponent implements OnInit {

  constructor(private store: Store<DonationsState>, private notification: NotificationService) { }

  donations: any;
  rawDonations: any

  ngOnInit() {
    this.store.dispatch(actionLDonationsRetrieve());
    this.store.pipe(select(selectLAllDonations))
      .subscribe(donations => {
        if (donations) {
          this.rawDonations = donations;
          this.donations = donations.map(donation => this.toTabularContent(donation));
        }
      })

    this.store.pipe(select(selectLError))
      .subscribe(error => {
        if (error) {
          if ( error.message && error.message.indexOf('already accepted') >= 0) {
            this.notification.error('Intre timp aceasta donatie a fost deja acceptata');
          } else {
            this.notification.error('Avem momentan o problema. Te rugam sa reincerci  mai tarziu');
          }
        }
      })
  }

  private toTabularContent(donation: Donation) {
    const row = {};
    row['id'] = donation.id;
    row['gadgetType'] = donation.gadget.gadgetType;
    row['gadgetName'] = this.getName(donation.gadget.gadgetType);
    switch (donation.gadget.gadgetType) {
      case 'laptop':
        row['model'] = donation.gadget.laptop.make + ( donation.gadget.laptop.model ? ' ' + donation.gadget.laptop.model : '')
        row['year'] =  donation.gadget.laptop.year;
        row['diagonal'] = donation.gadget.laptop.screen ? donation.gadget.laptop.screen : '';
        row['others'] = '';
        // row['registeredUser'] = donation.user.registeredUser ? 'Da' : 'Nu';
        row['location'] = donation.loc.name;
        row['date'] = '';
        break;
      case 'tablet':
        row['model'] = donation.gadget.tablet.make + ( donation.gadget.tablet.model ? ' ' + donation.gadget.tablet.model : '')
        row['year'] =  donation.gadget.tablet.year;
        row['diagonal'] = donation.gadget.tablet.screen ? donation.gadget.tablet.screen : '';
        row['others'] = '';
        // row['registeredUser'] = donation.user.registeredUser ? 'Da' : 'Nu';
        row['location'] = donation.loc.name;
        row['date'] = '';
        break;
      case 'phone':
        row['model'] = donation.gadget.phone.make + ( donation.gadget.phone.model ? ' ' + donation.gadget.phone.model : '')
        row['year'] =  donation.gadget.phone.year;
        row['diagonal'] = donation.gadget.phone.screen ? donation.gadget.phone.screen : '';
        row['others'] = '';
        // row['registeredUser'] = donation.user.registeredUser ? 'Da' : 'Nu';
        row['location'] = donation.loc.name;
        row['date'] = '';
        break;
    }
    return row;
  }
  private getName(gadgetType){
    return gadgetNames[gadgetType];
  }

  handleEvent(event) {
    switch (event.type){
      case 'accept':
        this.store.dispatch(actionLDonationAccept({ donation : this.rawDonations.filter(elem => elem.id === event.data.id)[0]}));
        break;
      case 'reject':
        this.store.dispatch(actionLDonationReject({ donation : this.rawDonations.filter(elem => elem.id === event.data.id)[0]}));
        break;
    }
  }

  refresh(){
    this.store.dispatch(actionLDonationsRetrieve());
  }
}



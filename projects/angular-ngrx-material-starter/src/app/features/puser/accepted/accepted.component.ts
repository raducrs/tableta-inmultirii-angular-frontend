import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Donation, DonationsState, ExtendedDonation} from '../state/puser.model';
import {actionADonationsRetrieve, actionTDonationsRetrieve} from '../state/puser.actions';
import {selectAAllDonations, selectAError, selectTAllDonations, selectTError} from '../state/puser.selectors';
import {NotificationService} from '../../../core/notifications/notification.service';
import {gadgetNames} from '../display/display.component';


@Component({
  selector: 'anms-accepted',
  templateUrl: './accepted.component.html',
  styleUrls: ['./accepted.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AcceptedComponent implements OnInit {

  constructor(private store: Store<DonationsState>, private notification: NotificationService) { }

  donations: any;

  ngOnInit() {
    this.store.dispatch(actionADonationsRetrieve());
    this.store.pipe(select(selectAAllDonations))
      .subscribe(donations => {
        if (donations) {
          this.donations = donations.map(donation => this.toTabularContent(donation));
        }
      })

    this.store.pipe(select(selectAError))
      .subscribe(error => {
        if (error) {
          this.notification.error('Avem momentan o problema. Te rugam sa reincerci  mai tarziu');
        }
      })
  }

  private toTabularContent(donation: ExtendedDonation) {
    const row = {};
    row['id'] = donation.id;
    row['gadgetType'] = donation.gadget.gadgetType;
    row['gadgetName'] = this.getName(donation.gadget.gadgetType);
    row['status'] = donation.status;
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

  }

}



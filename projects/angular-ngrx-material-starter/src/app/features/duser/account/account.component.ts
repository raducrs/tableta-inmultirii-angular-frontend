import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';

import {NotificationService, ROUTE_ANIMATIONS_ELEMENTS} from '../../../core/core.module';
import {DonationState, MakeModel} from '../../donate/state/donation.model';
import {icons} from '../../donate/donate/finish-tab/finish-tab.component';
import {actionDonationsRetrieve} from '../state/duser.actions';
import {selectAllDonations, selectError} from '../state/duser.selectors';

@Component({
  selector: 'anms-puser-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AccountComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  donations: any[]

  constructor(private store: Store<DonationState>, private notification: NotificationService) {}

  ngOnInit() {
    this.store.dispatch(actionDonationsRetrieve());
    this.store.pipe(select(selectAllDonations))
      .subscribe(donations => {
        if (donations) {
          this.donations = donations.map(donation => this.toCardContent(donation));
        }
      })

    this.store.pipe(select(selectError))
      .subscribe(error => {
        if (error) {
          this.notification.error('Avem momentan o problema. Te rugam sa reincerci  mai tarziu');
        }
      })
  }


  private toCardContent(donation) {
      let title = ''
      let subtitle = 'An ';
      let icon;
      let hardwareDesc;
      switch (donation.gadget.gadgetType) {
        case 'laptop':
          title = 'Laptop ';
          icon = 'laptop';
          title = this.getTitle(title, donation.gadget.laptop)
          subtitle = subtitle + donation.gadget.laptop.year;
          hardwareDesc = this.getHardwareDesc(donation.gadget.laptop, true)
          break;
        case 'tablet':
          title = 'Tableta ';
          icon = 'tablet';
          title = this.getTitle(title, donation.gadget.tablet)
          subtitle = subtitle + donation.gadget.tablet.year;
          hardwareDesc = this.getHardwareDesc(donation.gadget.tablet, false);
          break;
        case 'phone':
          icon = 'mobile';
          title = 'Telefon ';
          title = this.getTitle(title, donation.gadget.phone)
          subtitle = subtitle + donation.gadget.phone.year;
          hardwareDesc = this.getHardwareDesc(donation.gadget.phone, false);
          break;
      }

      const locDesc = {icon: icons[donation.loc.category], address: true, description: [[donation.loc.name, donation.loc.address]]}



      const sections = [{description: hardwareDesc, icon: icon}, locDesc];

      const status = donation.status;
      return { icon, title, subtitle, sections, status}
  }

  private getTitle(orgTitle, gadget: MakeModel){
    return orgTitle + gadget.make + ' ' + ( gadget.model ? gadget.model : '');
  }


  private getHardwareDesc(gadget, full){
    const desc = [];
    desc.push(['Ecran', gadget.screen ? gadget.screen : '-']);
    if (full){
      desc.push(['Memorie', gadget.memory ? gadget.memory : '-']);
    }
    desc.push(['Functional', 'Da']);
    desc.push(['Gol de continut', 'Da']);
    desc.push(['Acces liber', 'Da']);

    return desc;
  }
}

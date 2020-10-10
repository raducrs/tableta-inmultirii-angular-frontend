import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Donation, DonationState, DonationUser, MakeModel} from '../../state/donation.model';
import {select, Store} from '@ngrx/store';
import {selectDonation} from '../../state/donation.selectors';


export const icons = ['city', 'hand-holding-heart', 'graduation-cap'];
export const colors = ['grey', 'white', 'lightblue'];

@Component({
  selector: 'anms-finish-tab',
  templateUrl: './finish-tab.component.html',
  styleUrls: ['./finish-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class FinishTabComponent implements OnInit {

  donation: Donation;
  gadgetName; string;
  title: string;
  subtitle: string;
  icon: string;
  sections: any;

  constructor(private store: Store<DonationState>) {}

  ngOnInit(): void {
    this.store.pipe(select(selectDonation))
      .subscribe( this.toCardContent())
  }

  private toCardContent() {
    return donation => {
      // if (!donation || !donation.gadget || !donation.gadget.gadgetType || !donation.loc || !donation.loc.category || !donation.user){
      //   return;
      // }
      this.donation = donation;
      this.title = ''
      this.subtitle = 'An ';
      let hardwareDesc;
      switch (donation.gadget.gadgetType) {
        case 'laptop':
          this.gadgetName = 'un laptop';
          this.title = 'Laptop ';
          this.icon = 'laptop';
          this.title = this.getTitle(this.title, donation.gadget.laptop)
          this.subtitle = this.subtitle + donation.gadget.laptop.year;
          hardwareDesc = this.getHardwareDesc(donation.gadget.laptop, true)
          break;
        case 'tablet':
          this.title = 'Tableta ';
          this.icon = 'tablet';
          this.gadgetName = 'o tableta';
          this.title = this.getTitle(this.title, donation.gadget.tablet)
          this.subtitle = this.subtitle + donation.gadget.tablet.year;
          hardwareDesc = this.getHardwareDesc(donation.gadget.tablet, false);
          break;
        case 'phone':
          this.gadgetName = 'un telefon';
          this.icon = 'mobile';
          this.title = 'Telefon ';
          this.title = this.getTitle(this.title, donation.gadget.phone)
          this.subtitle = this.subtitle + donation.gadget.phone.year;
          hardwareDesc = this.getHardwareDesc(donation.gadget.phone, false);
          break;
      }

      const locDesc = {icon: icons[donation.loc.category], address: true, description: [[donation.loc.name, donation.loc.address]]}


      const userDesc = {
        icon: donation.user.registeredUser ? 'user-circle' : 'user-ninja',
        description: donation.user.registeredUser ? [['Cont', donation.user.email]] : this.getUnregisteredUser(donation.user)
      };

      this.sections = [{description: hardwareDesc, icon: this.icon}, locDesc, userDesc];

    };
  }

  private getTitle(orgTitle, gadget: MakeModel){
    return orgTitle + gadget.make + ' ' + ( gadget.model ? gadget.model : '');
  }

  private getUnregisteredUser(user: DonationUser){

    const desc = [];
    desc.push(['Nume', user.name ? user.name : '-']);
    desc.push(['Email', user.email ? user.email : '-']);
    desc.push(['Telefon', user.phone ? user.phone : '-']);
    return desc;
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

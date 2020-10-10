import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {DonationsState, ExtendedDonation} from '../state/puser.model';
import {select, Store} from '@ngrx/store';
import {selectDonationDetails, selectDonationLoading} from '../state/puser.selectors';
import {
  actionADonationReject,
  actionADonationRetrieve,
  actionADonationShowContact,
  actionADonationStatusUpdate
} from '../state/puser.actions';

@Component({
  selector: 'anms-contact-display',
  templateUrl: './contact-display.component.html',
  styleUrls: ['./contact-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ContactDisplayComponent implements OnInit {

  @Input('id') id : string;

  loading = false;
  status = 'none'
  details;

  constructor(private store: Store<DonationsState>) {
  }

  ngOnInit(): void {
    this.store.pipe(select(selectDonationLoading, { id: this.id }))
      .subscribe( isLoading => {
        this.loading = isLoading;
      })
    this.store.pipe(select(selectDonationDetails, { id: this.id }))
      .subscribe( (donation: ExtendedDonation) => {
        if (donation){
          this.status = donation.status;

          if (donation.status === 'contact-shown' ||
            donation.status === 'contacted' ||
            donation.status === 'received') {
              if (!donation.details && !donation.isLoading){
                this.store.dispatch(actionADonationRetrieve({id: this.id}));
              } else {
                this.details = donation.details;
              }
          }
        }
      })

  }

  showContact(){
    this.store.dispatch(actionADonationShowContact({id: this.id}));
  }

  contacted(){
    this.store.dispatch(actionADonationStatusUpdate({id: this.id, status: 'contacted'}));
  }

  received(){
    this.store.dispatch(actionADonationStatusUpdate({id: this.id, status: 'given'}));
  }

  reject(){
    this.store.dispatch(actionADonationReject({id: this.id}));
  }

}

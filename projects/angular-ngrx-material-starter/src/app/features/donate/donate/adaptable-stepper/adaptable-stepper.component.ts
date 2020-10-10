import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostListener
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import {select, Store} from '@ngrx/store';
import {DonationState} from '../../state/donation.model';
import {selectDonation, selectError, selectLoading, selectReady} from '../../state/donation.selectors';
import {actionDonationPost, actionGadgetClear} from '../../state/donation.actions';
import {NotificationService} from '../../../../core/notifications/notification.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'anms-adaptable-stepper',
  templateUrl: './adaptable-stepper.component.html',
  styleUrls: ['./adaptable-stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AdaptableStepperComponent implements OnInit {
  completedWhat = false;
  completedHow = false;
  completedWho = false;

  smallScreen = true;


  sending = false;
  donation;

  constructor(private store: Store<DonationState>, private notificationService: NotificationService, private router: Router, private route: ActivatedRoute) {
    this.smallScreen = window.innerWidth < 920;
  }

  // https://stackoverflow.com/a/39300671
  // https://stackoverflow.com/a/44393557 with debounce
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.smallScreen = window.innerWidth < 920;
  }

  ngOnInit() {
    this.store.pipe(select(selectDonation))
      .subscribe(donation => {
        this.donation = donation;
        }
      )

    this.store.pipe(select(selectLoading))
      .subscribe(loading => {
        this.sending = loading;
      });
    this.store.pipe(select(selectError))
      .subscribe( error => {
        if (error && error.message && error.message.indexOf('email error') >= 0){
          this.notificationService.error('A fost o problema cu email-ul furnizat. Te rugam sa incerci mai tarziu');
        } else if (error) {
          this.notificationService.error('A fost o eroare in procesare. Te rugam sa incerci mai tarziu');
        }
      })
  }

  gadgetSelectionMade(selectionMade: boolean) {
    this.completedWhat = selectionMade;
  }

  locationSelectionMade(selectionMade: boolean) {
    this.completedHow = selectionMade;
  }

  userSelectionMade(selectionMade: boolean) {
    this.completedWho = selectionMade;
  }

  sendDonation(){
    this.store.dispatch(actionDonationPost(this.donation));
  }

}

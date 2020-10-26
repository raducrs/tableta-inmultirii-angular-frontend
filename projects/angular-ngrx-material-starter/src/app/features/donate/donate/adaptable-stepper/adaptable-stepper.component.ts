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
import { select, Store } from '@ngrx/store';
import { DonationState } from '../../state/donation.model';
import {
  selectDonation,
  selectError,
  selectLoading,
  selectReady
} from '../../state/donation.selectors';
import {
  actionDonationPost,
  actionGadgetClear
} from '../../state/donation.actions';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  heading = 'Donează laptop, tabletă sau telefon';
  message =
    'Dacă ți-ai schimbat recent telefonul sau ai o tabletă ținută într-un sertar, poate un laptop uitat în debara, poți să le donezi și să ajuți să contribui la educație digitală cu șanse egale pentru toți.';
  initSel;

  constructor(
    private store: Store<DonationState>,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (typeof window !== undefined) {
      this.smallScreen = window.innerWidth < 920;
    }
  }

  // https://stackoverflow.com/a/39300671
  // https://stackoverflow.com/a/44393557 with debounce
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (typeof window !== undefined) {
      this.smallScreen = window.innerWidth < 920;
    }
  }

  ngOnInit() {
    this.store.pipe(select(selectDonation)).subscribe((donation) => {
      this.donation = donation;
    });

    this.store.pipe(select(selectLoading)).subscribe((loading) => {
      this.sending = loading;
    });
    this.store.pipe(select(selectError)).subscribe((error) => {
      if (error && error.message && error.message.indexOf('email error') >= 0) {
        this.notificationService.error(
          'A fost o problema cu email-ul furnizat. Te rugam sa incerci mai tarziu'
        );
      } else if (error) {
        this.notificationService.error(
          'A fost o eroare in procesare. Te rugam sa incerci mai tarziu'
        );
      }
    });

    const path = this.router.url;
    if (path) {
      if (path.indexOf('/laptop') >= 0) {
        this.heading = 'Donează laptop';
        this.message =
          'Dacă  ai un laptop pe care nu îl mai folosești sau l-ai schimbat, poți să îl donezi pentru unul dintre elevii care nu au posibilitatea să cumpere unul.';
        this.initSel = 'laptop';
      }
      if (path.indexOf('/tablet') >= 0) {
        this.heading = 'Donează tabletă';
        this.message =
          'Dacă ai o tabletă ținută într-un sertar pe care nu o mai folosești poți să o donezi și să contribui la educație digitală cu șanse egale pentru toți elevii. Donezi pentru unul dintre elevii care nu au posibilitatea să o cumpere.';
        this.initSel = 'tablet';
      }
      if (path.indexOf('/phone') >= 0) {
        this.heading = 'Donează telefon';
        this.message =
          'Dacă ți-ai schimbat recent telefonul poți să îl donezi și să contribui la educație digitală cu șanse egale pentru toți elevii din România.';
        this.initSel = 'phone';
      }
    }
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

  sendDonation() {
    this.store.dispatch(actionDonationPost(this.donation));
  }
}

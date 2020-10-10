import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ViewChild, ChangeDetectorRef
} from '@angular/core';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {DonationState} from '../../state/donation.model';
import {actionUserUpdate, actionUserUpdateFromLogin} from '../../state/donation.actions';
import {select, Store} from '@ngrx/store';
import {selectUser} from '../../state/donation.selectors';
import {Auth} from 'aws-amplify';
import { authLogin } from '../../../../core/auth/auth.actions';
import {selectIsAuthenticated} from '../../../../core/auth/auth.selectors';
import {sign} from 'crypto';
import {BehaviorSubject, ReplaySubject, Subject} from 'rxjs';


class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control.dirty && form.errors?.passwordMismatch) || (control.touched && control.errors);
  }
}

export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  return formGroup.get('nPassword').value && formGroup.get('nPassword2').value && formGroup.get('nPassword').value === formGroup.get('nPassword2').value ?
    null : { 'passwordMismatch': true };
}
@Component({
  selector: 'anms-user-tab',
  templateUrl: './user-tab.component.html',
  styleUrls: ['./user-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class UserTabComponent implements OnInit {
  @Output() selectionMade: EventEmitter<boolean> = new EventEmitter<boolean>();

  aUser: FormGroup;

  lUser: FormGroup;
  lHide = true;
  userNotLoggedin = true;
  failedLogin = new BehaviorSubject<boolean>(false);
  errorMessage;

  nUser: FormGroup;
  nHide = true;
  nHide2 = true;
  errorMatcher = new CrossFieldErrorMatcher();
  failedSignup = new BehaviorSubject<boolean>(false);
  errorMessageSignUp;
  signUpSuccessful = false;

  userName = 'Contul meu';

  selection;


  @ViewChild('userPanel', { static: true }) userPanel: MatExpansionPanel;
  @ViewChild('aPanel', { static: true }) aPanel: MatExpansionPanel;

  constructor(private store: Store<DonationState>, private globalStore: Store) {}

  ngOnInit(): void {
    this.aUser = new FormGroup({
      aName: new FormControl('', [ Validators.maxLength(50)]),
      aEmail: new FormControl('', [ Validators.required, Validators.maxLength(50), Validators.email]),
      aPhone: new FormControl('', [ Validators.pattern('^0(2|3|7|8|9)[0-9]{8,8}')]),
    })
    this.lUser = new FormGroup({
      lEmail: new FormControl('', [ Validators.required, Validators.maxLength(50), Validators.email]),
      lPassword: new FormControl('', [ Validators.required]),
    })

    this.nUser = new FormGroup({
      nName:  new FormControl('', [ Validators.maxLength(50)]),
      nEmail: new FormControl('', [ Validators.required, Validators.maxLength(50), Validators.email]),
      nPhone: new FormControl('', [ Validators.pattern('^0(2|3|7|8|9)[0-9]{8,8}')]),
      nPassword: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(6)]),
      nPassword2: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    }, { validators: passwordMatchValidator })

    this.store.pipe(select(selectUser))
      .subscribe(user => {
        if ( this.selection === undefined && user.registeredUser === false) {
          this.setStringField(this.aUser, 'aName', user, 'name')
          this.setStringField(this.aUser, 'aEmail', user, 'email')
          this.setStringField(this.aUser, 'aPhone', user, 'phone')
          this.selection = 'anonymous';
          this.aPanel.open();
          this.selectionMade.emit(this.aUser.valid);
        }
      })

    this.globalStore.pipe(select(selectIsAuthenticated))
      .subscribe(isAuth => this.userNotLoggedin = !isAuth);

    this.globalStore.pipe(select(selectUser))
      .subscribe(user => {
        if (user && user.email) {
          this.userName = user.email
        }
      });
  }

  private setStringField(form: FormGroup, fcName: string, source: any, sField: string){
    if (source){
      form.controls[fcName].setValue(source[sField])
      form.controls[fcName].markAsUntouched();
    }
  }

  selectedOption(optionId) {
    this.selection = optionId;
    if (this.selection === 'anonymous'){
      this.selectionMade.emit(this.aUser.valid);
      this.aUser.statusChanges.subscribe(status => {
        this.selectionMade.emit(this.aUser.valid);
        this.store.dispatch(actionUserUpdate({
          user: {
            name: this.aUser.controls['aName'].value,
            email: this.aUser.controls['aEmail'].value,
            phone: this.aUser.controls['aPhone'].value,
            registeredUser: false,
          }
        }))
      })
    } else if (this.selection === 'registered'){
      this.selectionMade.emit(!this.userNotLoggedin);
      this.store.dispatch(actionUserUpdateFromLogin())
    }

  }

  selectedOptionIfLoggedIn() {
    if (!this.userNotLoggedin) {
      this.selectedOption('registered');
    }
  }

  loginUser() {
    if (this.lUser.valid){
      this.errorMessage = ''
      this.failedLogin.next(false);
      Auth.signIn({
        username: this.lUser.controls['lEmail'].value,
        password: this.lUser.controls['lPassword'].value
      }).then(user => {
        if (user && user.username){
          this.globalStore.dispatch(authLogin({cognitoUser: {username: user.username,  idToken: user.signInUserSession.idToken.getJwtToken(), ...user.attributes}}));
          // use openAll() & closeAll() when multi set to true
          // https://www.freakyjolly.com/angular-material-expansion-panel-accordion-in-angular-project-using-material/#.Xt14WrziuUl
          this.userPanel.close();
          this.failedLogin.next(false);
          this.selectedOptionIfLoggedIn();
        }
      }, err => {
        if (err && err.code === 'NotAuthorizedException'){
          this.errorMessage = 'Email sau parola gresite'
        } else if (err && err.code === 'UserNotConfirmedException'){
          this.errorMessage = 'Cont nevalidat. Verifica-ti emailul pentru a activa'
        } else {
          this.errorMessage = 'Ne pare rau. O erroare s-a produs. Incearca mai tarziu.'
        }
        this.failedLogin.next(true);
        // this.ref.detectChanges();
      })
    }

  }

  signUpUser() {
    this.failedSignup.next(false);
    if (this.nUser.valid){
      const signUpForm = {
        username: this.nUser.controls['nEmail'].value,
        password: this.nUser.controls['nPassword'].value,
        attributes: {
          name:  this.nUser.controls['nName'].value,
          email: this.nUser.controls['nEmail'].value,
          'custom:usergroup': 'user'
        }};
      if (this.nUser.controls['nPhone'].value) {
        signUpForm['attributes']['phone_number'] = '+4' + this.nUser.controls['nPhone'].value
      }
      Auth.signUp(
        signUpForm
        ).then((signUpResult) => {
        this.failedSignup.next(false);
        this.userPanel.open();
        this.userName = signUpResult.user.getUsername();
        this.lUser.controls['lEmail'].setValue(this.nUser.controls['nEmail'].value)
        this.signUpSuccessful = true;
      }, err => {
        if (err && err.code === 'UsernameExistsException'){
          this.errorMessageSignUp = 'Email-ul este deja folosit. Daca ai uitat parola poti cere sa o resetezi'
        }
        this.errorMessageSignUp = 'Ne pare rau. O erroare s-a produs. Incearca mai tarziu.'
        this.failedSignup.next(true);
        // this.ref.detectChanges(); // alternatively code with observables instead of booleans
      })

    }
  }

  public hasError = (form: FormGroup , controlName: string, errorName: string) => {
    return form.controls[controlName].hasError(errorName);
  }

  public passmismatchError(noop){
    return this.nUser.errors?.passwordMismatch && (this.nUser.controls['nPassword'].touched || this.nUser.controls['nPassword'].dirty);
  }

}

import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Auth } from 'aws-amplify';
import {authGoToAccount, authLogin} from '../../../core/auth/auth.actions';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import {BehaviorSubject} from 'rxjs';

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
  selector: 'anms-sign-in',
  templateUrl: './pwd-reset.component.html',
  styleUrls: ['./pwd-reset.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PwdResetComponent implements OnInit {

  passwordInput = false;
  rUser: FormGroup;
  pUser: FormGroup;
  hide = true;
  hide2 = true;
  message = '';
  passwordReset = new BehaviorSubject(false);

  errorReset = new BehaviorSubject(false);

  errorMatcher = new CrossFieldErrorMatcher();


  constructor( private store: Store, private router: Router, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.rUser = new FormGroup({
      rEmail: new FormControl('', [ Validators.required, Validators.maxLength(50), Validators.email]),
    })

    this.pUser = new FormGroup({
      nCode:  new FormControl('', [ Validators.required]),
      nPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      nPassword2: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    }, { validators: passwordMatchValidator })
  }

  public requestCode(){
    if (this.rUser.valid){
      Auth.forgotPassword(this.rUser.controls['rEmail'].value);
      // this.rUser.controls['rEmail'].setValue(''); only in case of resubmit request
      this.passwordInput = true;
    }
  }

  public resetPassword(){
     if (this.pUser.valid){
       Auth.forgotPasswordSubmit(this.rUser.controls['rEmail'].value, this.pUser.controls['nCode'].value, this.pUser.controls['nPassword'].value).then(
         () => {this.message = 'Parola a fost schimbata cu success'; this.passwordReset.next(true); this.errorReset.next(true);},
         () =>  {this.message = 'Ceva este in neregula'; this.errorReset.next(true); }
       )
     }
  }

  public hasError = (form: FormGroup , controlName: string, errorName: string) => {
    return form.controls[controlName].hasError(errorName);
  }

  public passmismatchError(noop){
    return this.pUser.errors?.passwordMismatch && (this.pUser.controls['nPassword'].touched || this.pUser.controls['nPassword'].dirty);
  }

}

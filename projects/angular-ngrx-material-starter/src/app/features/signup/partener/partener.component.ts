import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
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
import { Auth } from 'aws-amplify'
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control.dirty && form.errors?.passwordMismatch) || (control.touched && control.errors);
  }
}

export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  return formGroup.get('password').value && formGroup.get('password').value && formGroup.get('password').value === formGroup.get('password2').value ?
    null : { 'passwordMismatch': true };
}
@Component({
  selector: 'anms-home',
  templateUrl: './partener.component.html',
  styleUrls: ['./partener.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartenerComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  // releaseButler = require('../../../../assets/release-butler.png').default;

  partenerForm: FormGroup;
  hide = true;
  hide2 = true;
  errorMatcher = new CrossFieldErrorMatcher();

  errorMessage = '';
  signupError = new BehaviorSubject(false);
  constructor(private router: Router, private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.partenerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.email]),
      password: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(6)]),
      password2: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^0(2|3|7|8|9)[0-9]{8,8}')]),
      address: new FormControl('', [Validators.required, Validators.maxLength(200), Validators.minLength(5)]),
      link: new FormControl('')
    }, { validators: passwordMatchValidator } )
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.partenerForm.controls[controlName].hasError(errorName);
  }

  public passmismatchError(noop){
    return this.partenerForm.errors?.passwordMismatch && (this.partenerForm.controls['password'].touched || this.partenerForm.controls['password'].dirty);
  }

  public submitForm(){
    // this.partenerForm.markAllAsTouched();
    // Object.keys(this.partenerForm.controls).forEach(key => this.partenerForm.controls[key].updateValueAndValidity());
    if (this.partenerForm.valid){
      this.signupError.next(false);
      Auth.signUp(
        {
          username: this.partenerForm.controls['email'].value,
          password: this.partenerForm.controls['password'].value,
          attributes: {
            name:  this.partenerForm.controls['name'].value,
            email: this.partenerForm.controls['email'].value,
            phone_number: '+4' + this.partenerForm.controls['phone'].value,
            address: this.partenerForm.controls['address'].value,
            'custom:link': this.partenerForm.controls['link'].value,
            'custom:usergroup': 'partener'
          }}).then(success => {
          this.router.navigate(['/user-forms/partner/confirm']);
      }, err => {
            if (err && err.code === 'UsernameExistsException'){
              this.errorMessage = 'Email-ul este deja folosit'
            } else {
              this.errorMessage = 'Ne pare rau. O erroare s-a produs. Incearca mai tarziu.'
            }
            this.signupError.next(true);
          })

    }

  }
}

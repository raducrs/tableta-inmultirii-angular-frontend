import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Auth } from 'aws-amplify';
import {authGoToAccount, authLogin} from '../../../core/auth/auth.actions';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'anms-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SignInComponent implements OnInit {

  lUser: FormGroup;
  hide = true;
  failedLogin = new BehaviorSubject(false);
  errorMessage = ''



  constructor( private store: Store, private router: Router, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.lUser = new FormGroup({
      lEmail: new FormControl('', [ Validators.required, Validators.maxLength(50), Validators.email]),
      lPassword: new FormControl('', [ Validators.required]),
    })
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.lUser.controls[controlName].hasError(errorName);
  }

  loginUser(){
      if (this.lUser.valid){
        this.errorMessage = ''
        this.failedLogin.next(false);
        Auth.signIn({
          username: this.lUser.controls['lEmail'].value,
          password: this.lUser.controls['lPassword'].value
        }).then(user => {
          if (user && user.username){
            this.store.dispatch(authLogin({cognitoUser: {username: user.username, idToken: user.signInUserSession.idToken.getJwtToken(), ...user.attributes}}));
            this.store.dispatch(authGoToAccount());
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
        })
      }
  }
}

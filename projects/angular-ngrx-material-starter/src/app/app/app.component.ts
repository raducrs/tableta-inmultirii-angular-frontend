import browser from 'browser-detect';
import {Component, HostListener, OnInit} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { environment as env } from '../../environments/environment';

import {
  authLogin,
  authLogout,
  routeAnimations,
  LocalStorageService,
  selectIsAuthenticated,
  selectSettingsStickyHeader,
  selectSettingsLanguage,
  selectEffectiveTheme, NotificationService
} from '../core/core.module';
import {
  actionSettingsChangeAnimationsPageDisabled,
  actionSettingsChangeLanguage
} from '../core/settings/settings.actions';
import { Auth } from 'aws-amplify'
import {authGoToAccount} from '../core/auth/auth.actions';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'anms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {
  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = require('../../assets/logo.png').default;
  languages = ['en', 'de', 'sk', 'fr', 'es', 'pt-br', 'zh-cn', 'he'];
  navigation = [
    { link: 'donate', label: 'Doneaza' },
    { link: 'user-forms/partner/sign-up', label: 'Partener' },
    { link: 'home/contact', label: 'Contact' }
  ];
  navigationSideMenu = [
    ...this.navigation
  ];

  bannerText = '';
  dismised = false;
  dimissible = true;

  isAuthenticated$: Observable<boolean>;
  isAuthenticated = false;
  stickyHeader$: Observable<boolean>;
  language$: Observable<string>;
  theme$: Observable<string>;

  constructor(
    private store: Store,
    private storageService: LocalStorageService,
    private httpClient: HttpClient,
    private notificationService: NotificationService
  ) {}

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  @HostListener('window:focus', ['$event'])
  onFocus(event) {
    Auth.currentAuthenticatedUser().then(
      user => {
        if (user && user.username){
          this.store.dispatch(authLogin({cognitoUser: {username: user.username, idToken: user.signInUserSession.idToken.getJwtToken(), ...user.attributes}}));
        } else {
          if (this.isAuthenticated) {
            this.notificationService.info('Ai fost automat scos din cont pentru a te proteja.')
          }

          this.store.dispatch(authLogout({redirect: false}));

        }
      },
      err => {
        if (this.isAuthenticated) {
          this.notificationService.info('Ai fost automat scos din cont pentru a te proteja.')
        }
        this.store.dispatch(authLogout({redirect: false}))
      }
    )
  }

  ngOnInit(): void {
    this.storageService.testLocalStorage();
    if (AppComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        actionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
    }

    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.isAuthenticated$.subscribe(isLogedIn => {
      this.isAuthenticated = isLogedIn;
    })
    this.stickyHeader$ = this.store.pipe(select(selectSettingsStickyHeader));
    this.language$ = this.store.pipe(select(selectSettingsLanguage));
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));
    // http interceptor to listen to expired token error and logout user
    Auth.currentAuthenticatedUser().then(
      user => {
        if (user && user.username){
          this.store.dispatch(authLogin({cognitoUser: {username: user.username, idToken: user.signInUserSession.idToken.getJwtToken(), ...user.attributes}}));
        } else {
          this.store.dispatch(authLogout({redirect: false}));
        }
      },
      err => this.store.dispatch(authLogout({redirect: false}))
    )

    this.httpClient.get<{ txt: string, dismissible: boolean}>('assets/banner.json').subscribe(text => {
      this.bannerText = text.txt;
      this.dimissible = text.dismissible;
    })


  }


  onLogoutClick() {
    this.store.dispatch(authLogout({redirect: true}));
    Auth.signOut();
  }

  goToAccount() {
    this.store.dispatch(authGoToAccount());
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(actionSettingsChangeLanguage({ language }));
  }

  dismissBanner(){
    this.dismised = true;
  }
}

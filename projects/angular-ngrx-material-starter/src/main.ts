import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Amplify, { Auth } from 'aws-amplify';

const config = { Auth: {

    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: 'arn:aws:cognito-idp:eu-central-1:268582324557:userpool/eu-central-1_RgqTe3eP0',

    // REQUIRED - Amazon Cognito Region
    region: 'eu-central-1',

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    // identityPoolRegion: 'XX-XXXX-X',
    // https://github.com/aws-amplify/amplify-js/issues/6350
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'eu-central-1_RgqTe3eP0',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '7110q1p1kknjh77momg74j11tb',


    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,

    // OPTIONAL - Configuration for cookie storage
    // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
    // cookieStorage: {
    //   // REQUIRED - Cookie domain (only required if cookieStorage is provided)
    //   domain: 'localhost:4200',
    //   // OPTIONAL - Cookie path
    //   path: '/',
    //   // OPTIONAL - Cookie expiration in days
    //   expires: 365,
    //   // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
    //   sameSite: 'strict', // | "lax"
    //   // OPTIONAL - Cookie secure flag
    //   // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
    //   secure: true
    // },

    // // OPTIONAL - customized storage object
    // storage: MyStorage,

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: 'USER_PASSWORD_AUTH',

    // // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
    // clientMetadata: { myCustomKey: 'myCustomValue' },

    // // OPTIONAL - Hosted UI configuration
     oauth: {
       domain: 'auth.tableta-inmultirii.ro',
    //   scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
    //   redirectSignIn: 'http://localhost:3000/',
    //   redirectSignOut: 'http://localhost:3000/',
    //   responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
     },

     // endpoint: environment.production ? 'https://auth.tableta-inmultirii.ro' : undefined
     // endpoint: 'https://auth.tableta-inmultirii.ro/'
  }
};

Amplify.configure(config);
Auth.configure(config);

// You can get the current config object
const currentConfig = Auth.configure();

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

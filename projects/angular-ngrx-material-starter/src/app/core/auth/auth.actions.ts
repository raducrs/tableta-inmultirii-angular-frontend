import {createAction, props} from '@ngrx/store';
import {CognitoUser} from './auth.models';


export const authLogin = createAction('[Auth] Login', props<{cognitoUser: CognitoUser }>());
export const authLogout = createAction('[Auth] Logout', props<{redirect: boolean}>());
export const authGoToAccount = createAction('[Auth] Go To Account');
export const authRefresh = createAction('[Auth] Refresh token');
export const authNOOP = createAction('[Auth] NOOP');

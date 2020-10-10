import { authLogin, authLogout } from './auth.actions';
import {CognitoUser} from './auth.models';


describe('Auth Actions', () => {
  it('should create ActionAuthLogin action', () => {
    const action = authLogin({ cognitoUser: {} as CognitoUser});
    expect(action.type).toEqual('[Auth] Login');
  });

  it('should create ActionAuthLogout action', () => {
    const action = authLogout();
    expect(action.type).toEqual('[Auth] Logout');
  });
});

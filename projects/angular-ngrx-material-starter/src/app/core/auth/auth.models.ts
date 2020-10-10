
export interface CognitoUser{
  username?: string;
  address?: string;
  'custom?:usergroup'?: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  phone_number?: string;
  phone_number_verified?: boolean;
  sub?: string;
  idToken?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  cognitoUser?: CognitoUser
}

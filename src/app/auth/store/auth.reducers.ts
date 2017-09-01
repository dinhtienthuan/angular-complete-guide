import {
  AuthActions,
  SET_TOKEN,
  SIGNIN,
  SIGNOUT,
  SIGNUP
} from './auth.actions';
import { AuthState } from './auth.state';

const initialState: AuthState = {
  token: null,
  authenticated: false
};

export function authReducers(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SIGNIN:
    case SIGNUP:
      return {
        ...state,
        authenticated: true
      };
    case SIGNOUT:
      return {
        ...state,
        authenticated: false,
        token: null
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
}

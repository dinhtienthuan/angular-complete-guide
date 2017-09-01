import {
  Actions,
  Effect
} from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  SET_TOKEN,
  Signout,
  SIGNOUT,
  SIGNUP,
  TRY_SIGNIN,
  TRY_SIGNUP,
  TrySignin,
  TrySignup
} from './auth.actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { fromPromise } from 'rxjs/observable/fromPromise';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$
    .ofType(TRY_SIGNUP)
    .map((action: TrySignup) => {
      return action.payload;
    })
    .switchMap((authData: { email: string, password: string }) => {
      return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password));
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
      return [
        {
          type: SIGNUP
        },
        {
          type: SET_TOKEN,
          payload: token
        }
      ];
    });

  @Effect()
  authSignin = this.actions$
    .ofType(TRY_SIGNIN)
    .map((action: TrySignin) => {
      return action.payload;
    })
    .switchMap((authData: { email: string, password: string }) => {
      return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.email, authData.password));
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
      this.route.navigate(['/']);
      return [
        {
          type: SIGNUP
        },
        {
          type: SET_TOKEN,
          payload: token
        }
      ];
    });

  @Effect({ dispatch: false })
  authSignout = this.actions$
    .ofType(SIGNOUT)
    .do(() => {
      this.route.navigate(['auth/signin']);
    });

  constructor(private actions$: Actions, private route: Router) {
  }
}

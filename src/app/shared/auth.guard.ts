import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { AuthState } from '../auth/store/auth.state';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private route: Router, private store: Store<AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const authState: Observable<AuthState> = this.store.select<AuthState>(
      appState => appState.auth);

    authState.take(1).subscribe((s: AuthState) => {
      if (!s.authenticated) {
        this.route.navigate(['/auth/signin']);
      }
    });

    return authState.take(1).map((s: AuthState) => {
      return s.authenticated;
    });
  }


  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return Observable.of(true);
  }
}

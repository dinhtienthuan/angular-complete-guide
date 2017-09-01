import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { AuthState } from '../auth/store/auth.state';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) {
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    const authState: Observable<AuthState> = this.store.select(
      state => state.auth);
    return authState.take(1).switchMap((state: AuthState) => {
      const token = state.token;
      const copiedReq = req.clone({
        params: req.params.set('auth', token)
      });
      return next.handle(copiedReq);
    });
  }
}

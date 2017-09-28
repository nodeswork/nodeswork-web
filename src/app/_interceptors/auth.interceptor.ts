import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import * as _               from 'underscore';
import { Observable }       from 'rxjs/Observable';
import { Injectable }       from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
}                           from '@angular/common/http';
import { Router }           from '@angular/router';
import { MatSnackBar }      from '@angular/material';

import { UserStateService } from '../_services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router:     Router,
    private userState:  UserStateService,
    private snackBar:   MatSnackBar,
  ) {}

  intercept(
    req: HttpRequest<any>, next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req.clone({
      withCredentials: true,
    })).catch((err: any) => {
      if (err instanceof HttpErrorResponse) {
        let error: any;
        if (_.isString(err.error)) {
          error = JSON.parse(err.error);
        } else {
          error = err.error;
        }

        if (err.status === 401 && error.message === 'require login') {
          this.userState.remove();
          this.router.navigate(['/login']);
          return Observable.of(null);
        } else if (err.statusText === 'Unknown Error') {
          console.error('Server is not reachable');
          // TODO: Figure out why flash message is not shown
          this.snackBar.open('Server is not reachable', 'wait', {
            duration: 5000,
          });
        }
      }
      return Observable.throw(err);
    });
  }
}

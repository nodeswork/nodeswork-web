import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

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

import { UserStateService } from '../_services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private userState: UserStateService,
  ) {}

  intercept(
    req: HttpRequest<any>, next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req.clone({
      withCredentials: true,
    })).catch((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401 && err.error.message === 'require login') {
          this.userState.remove();
          this.router.navigate(['/login']);
        }
      }
      return Observable.throw(err);
    });
  }
}

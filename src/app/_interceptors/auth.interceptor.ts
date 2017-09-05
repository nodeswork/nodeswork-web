import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
}                     from '@angular/common/http';
import { Router }     from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>, next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req.clone({
      withCredentials: true,
    })).catch((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401 && err.error.message === 'require login') {
          this.router.navigate(['/login']);
        }
      }
      return Observable.throw(err);
    });
  }
}

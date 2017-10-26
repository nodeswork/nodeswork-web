import { Injectable, ErrorHandler } from '@angular/core';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {

  constructor() { }

  handleError(error) {
    console.error('Uncaught error', error);
  }
}

import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MenuService {

  private menuOpened = new Subject<boolean>();

  constructor() { }

  menu(): Observable<boolean> {
    return this.menuOpened.asObservable();
  }

  open() {
    this.menuOpened.next(true);
  }

  close() {
    this.menuOpened.next(false);
  }
}

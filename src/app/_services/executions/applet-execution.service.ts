import { Injectable }       from '@angular/core';
import { HttpParams }       from '@angular/common/http';
import { ApiClientService } from '../utils/api-client.service';

@Injectable()
export class AppletExecutionService {

  constructor(
    private api: ApiClientService,
  ) { }
}

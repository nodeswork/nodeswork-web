import { Injectable }       from '@angular/core';
import { HttpParams }       from '@angular/common/http';
import { ApiClientService } from '../utils/api-client.service';

@Injectable()
export class AppletExecutionService {

  constructor(
    private api: ApiClientService,
  ) { }

  async appletExecutionMetrics(
    options: AppletExecutionMetricsOptions,
  ): Promise<any[]> {
    const params = new HttpParams()
      .append('startTime', (Date.now() - 24 * 3600 * 1000).toString())
      .append('endTime', Date.now().toString())
      .append('metrics', 'result')
      .append('metrics', 'Contract Found')
      .append('metrics', 'Contract Searched')
    ;
    return await this.api.get(
      `/v1/u/executions/applets/${options.userAppletId}/metrics`,
      { params },
    );
  }
}

export interface AppletExecutionMetricsOptions {
  userAppletId: string;
}

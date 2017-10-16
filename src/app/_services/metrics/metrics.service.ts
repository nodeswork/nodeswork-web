import { Injectable }       from '@angular/core';
import { HttpParams }       from '@angular/common/http';

import { ApiClientService } from '../utils/api-client.service';
import { MetricsData }      from '../../_models';

@Injectable()
export class MetricsService {

  constructor(
    private api: ApiClientService,
  ) { }

  async getMetrics(
    options: GetMetricsOptions,
  ): Promise<MetricsData[]> {
    let params = new HttpParams()
      .append('startTime', options.timerange.start.toString())
      .append('endTime', options.timerange.end.toString())
      .append('granularity', options.granularity.toString())
    ;
    for (const dimensionName of options.dimensions) {
      params = params.append('dimensions', dimensionName);
    }
    for (const metricsName of options.metrics) {
      params = params.append('metrics', metricsName);
    }
    return await this.api.get(options.url, { params });
  }
}

export interface GetMetricsOptions {
  url:         string;
  timerange:   {
    start:     number;
    end:       number;
  };
  granularity: number;
  dimensions:  string[];
  metrics:     string[];
}

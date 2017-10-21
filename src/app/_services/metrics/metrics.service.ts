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
    return await this.api.post(options.url, options);
  }
}

export interface GetMetricsOptions {
  url:         string;
  timerange:   {
    start:     number;
    end:       number;
  };
  granularity: number;
  dimensions:  GetMetricsDimensionOptions[];
  metrics:     string[];
}

export interface GetMetricsDimensionOptions {
  name:          string;
  selectValues:  any[];
  omitValues:    any[];
}

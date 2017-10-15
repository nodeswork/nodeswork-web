import * as _                       from 'underscore';
import { Component, OnInit, Input } from '@angular/core';

import { ui }                       from '@nodeswork/applet/dist/ui';

import { MetricsService }           from '../../_services';
import { MetricsData }              from '../../_models';

@Component({
  selector: 'app-metrics-panel',
  templateUrl: './metrics-panel.component.html',
  styleUrls: ['./metrics-panel.component.css']
})
export class MetricsPanelComponent implements OnInit {

  @Input() config:  object;
  @Input() role:    string;
  private  _config: ui.metrics.MetricsPanel;
  private  mData:   MData;

  constructor(
    private metricsService: MetricsService,
  ) { }

  async ngOnInit() {
    this._config  = this.config as any;
    this.mData    = { groups: [] };

    for (const group of this._config.groups) {
      const requests: MetricsRequest[] = _.chain(group.metricsConfigs)
        .map((metrics) => {
          const url = `/v1/u/metrics/${this.role}/${metrics.source}`;
          return {
            url,
            metrics: metrics.name,
          };
        })
        .groupBy((d) => d.url)
        .map((val: any, url: string) => {
          return {
            url,
            metrics: _.map(val, (v: any) => v.metrics),
          };
        })
        .value();

      const gData: GData = {};

      for (const request of requests) {
        const data = await this.metricsService.getMetrics({
          url:          request.url,
          metrics:      request.metrics,
          timeRange:    this._config.rangeSelection.timeRange,
          granularity:  this._config.rangeSelection.granularity,
          dimensions:   [],
        });

        for (const metricsName of request.metrics) {
          gData[metricsName] = data;
        }
      }

      this.mData.groups.push(gData);
    }
    console.log(this.mData);
  }
}

interface MetricsRequest {
  url:      string;
  metrics:  string[];
}

interface MData {
  groups:   GData[];
}

interface GData {
  [metricsName: string]: MetricsData[];
}

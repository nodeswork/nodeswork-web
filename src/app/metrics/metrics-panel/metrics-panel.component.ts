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

  options:  any;
  data:     any;

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

    for (const idx in this._config.groups) {
      const groupConfig = this._config.groups[idx];
      const gData = this.mData.groups[idx];
      console.log(idx, groupConfig, gData);

      for (const metrics of groupConfig.metricsConfigs) {
        this.data = [
          {
            key: metrics.name,
            bar: true,
            values: _.map(gData[metrics.name], (v) => {
              return {
                label: v.timerange.start,
                value: Object.values(v.metrics[metrics.name])[0].val,
              };
            }),
          },
          {
            key: metrics.name + 'copy',
              bar: true,
              values: _.map(gData[metrics.name], (v) => {
                return {
                  label: v.timerange.start,
                  value: Object.values(v.metrics[metrics.name])[0].val,
                };
              }),
          }
        ];
        console.log(this.data);
      }
    }
    console.log(
      this._config.rangeSelection.timeRange.start.getTime(),
      this._config.rangeSelection.timeRange.end.getTime(),
    )

    this.options = {
      chart: {
        type: 'lineChart',
        height: 450,
        margin : {
          top: 20,
          right: 200,
          bottom: 50,
          left: 55
        },
        x: function(d){ return d.label; },
        y: function(d){ return d.value; },
        showValues: true,
        valueFormat: function(d){
          return d3.format(',.0f')(d);
        },
        duration: 500,
        xDomain: [
            this._config.rangeSelection.timeRange.start.getTime(),
            this._config.rangeSelection.timeRange.end.getTime(),
        ],
        xAxis: {
          // scale: d3.time.scale().domain(
            // [
              // new Date(this._config.rangeSelection.timeRange.start),
              // new Date(this._config.rangeSelection.timeRange.end),
            // ],
          // ),
          axisLabel: 'X Axis',
          tickFormat: function(d) {
            return d3.time.format('%x %H:%M')(new Date(d));
          },
        },
        yAxis: {
          axisLabel: 'Y Axis',
          axisLabelDistance: -10
        }
      }
    };

    console.log(this.data);
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

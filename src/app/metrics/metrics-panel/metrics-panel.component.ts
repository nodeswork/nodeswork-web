import * as _                       from 'underscore';
import * as moment                  from 'moment';

import { Component, OnInit, Input } from '@angular/core';

import { ui }                       from '@nodeswork/applet/dist/ui';
import { metrics as m }             from '@nodeswork/utils';

import { MetricsService }           from '../../_services';
import { MetricsData, NVSeries }    from '../../_models';

const ALLOWED_GRANULARITY = [ 60, 300, 600, 900, 3600, 24 * 3600 ];

function floor(x: number, scale: number) {
  return Math.floor(x / scale) * scale;
}

function ceil(x: number, scale: number) {
  return Math.ceil(x / scale) * scale;
}

@Component({
  selector: 'app-metrics-panel',
  templateUrl: './metrics-panel.component.html',
  styleUrls: ['./metrics-panel.component.css']
})
export class MetricsPanelComponent implements OnInit {

  // UI fields
  granularityHuman:  string;
  startHuman:        string;
  endHuman:          string;

  @Input() config:   object;
  @Input() role:     string;

  granularity:       number;
  timerange:         {
    start:           number;
    end:             number;
  };
  start:             Date;
  end:               Date;
  formatter:         d3.time.Format;
  interval:          d3.time.Interval;
  intervalStep:      number;
  intervalRange:     Date[];
  intervalRangeTs:   number[];

  private  _config:  ui.metrics.MetricsPanel;
  private  mData:    MData;

  nvData:   NVData;

  constructor(
    private metricsService: MetricsService,
  ) {
  }

  private initializeConfigs() {
    this._config           = this.config as any;

    this.granularity       = _.find(ALLOWED_GRANULARITY, (x) => {
      return x === this._config.rangeSelection.granularity;
    }) || 600;

    const scale            = this.granularity * 1000;
    this.granularityHuman  = moment.duration(
      this.granularity, 'seconds',
    ).humanize();

    this.timerange = {
      start: this._config.rangeSelection.timerange.start,
      end:   this._config.rangeSelection.timerange.end,
    };

    if (this.timerange.start <= 0) {
      this.timerange.start += Date.now();
    }
    if (this.timerange.end <= 0) {
      this.timerange.end += Date.now();
    }

    this.timerange = {
      start:  ceil(this.timerange.start, scale),
      end:    ceil(this.timerange.end, scale),
    };

    if (this.granularity >= 3600 * 24) {
      this.formatter     = d3.time.format('%x');
      this.interval      = d3.time.day;
      this.intervalStep  = this.granularity / 3600 / 24;
    } else if (this.granularity >= 3600) {
      this.formatter     = d3.time.format('%x %H:%M');
      this.interval      = d3.time.hour;
      this.intervalStep  = this.granularity / 3600;
    } else {
      this.formatter = d3.time.format('%x %H:%M');
      this.interval      = d3.time.minute;
      this.intervalStep  = this.granularity / 60;
    }

    this.start           = new Date(this.timerange.start);
    this.end             = new Date(this.timerange.end);
    this.startHuman      = this.formatter(this.start);
    this.endHuman        = this.formatter(this.end);
    this.intervalRange   = this.interval.range(
      this.start, this.end, this.intervalStep,
    );
    this.intervalRangeTs = _.map(this.intervalRange, (r) => r.getTime());
  }

  async ngOnInit() {
    this.initializeConfigs();

    await this.fetchMDataParallel();
    await this.initializeNVData();

    for (let idx = 0; idx < this._config.groups.length; idx++) {
      this.updateGroupData(idx);
    }
  }

  private async fetchMDataParallel() {
    this.mData    = { groups: [] };

    const dataRequests: AsyncDataRequest[] = [];

    for (let i = 0; i < this._config.groups.length; i++) {
      const group  = this._config.groups[i];
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
        dataRequests.push({
          groupId:        i,
          metrics:        request.metrics,
          dataPromise:    this.metricsService.getMetrics({
            url:          request.url,
            metrics:      request.metrics,
            timerange:    this.timerange,
            granularity:  this.granularity,
            dimensions:   [],
          }),
        });
      }

      this.mData.groups.push(gData);
    }

    await Promise.all(_.map(dataRequests, (x) => x.dataPromise));

    for (const request of dataRequests) {
      const data = await request.dataPromise;
      for (const metricsName of request.metrics) {
        this.mData.groups[request.groupId][metricsName] = data;
      }
    }
  }

  toggleDimension(groupIdx: number, dimensionIdx: number) {
    const dimension = this.nvData.groups[groupIdx].dimensions[dimensionIdx];
    dimension.enabled = !dimension.enabled;
    this.updateGroupData(groupIdx);
  }

  private initializeNVData() {
    const self = this;
    this.nvData = { groups: [] };
    for (const groupConfig of this._config.groups) {
      const nvGroup = {
        title:       groupConfig.title,
        graphs:      [],
        dimensions:  groupConfig.dimensionConfigs,
      };
      this.nvData.groups.push(nvGroup);

      for (const graphConfig of groupConfig.graphs) {
        const yFormatter = (function(gc) {
          let formatter;
          if (gc.percentage) {
            formatter = d3.format('.0%');
          } else {
            formatter = d3.format(',.0f');
          }
          return (d) => formatter(d);
        })(graphConfig);
        const nvOptions: any = {
          chart: {
            type:      graphConfig.chart.type,
            height:    220,
            margin :   {
              top:     40,
              right:   80,
              bottom:  50,
              left:    55
            },
            x: function(d){ return d.label; },
            y: function(d){ return d.value; },
            showValues: true,
            valueFormat: yFormatter,
            tooltip: {
              keyFormatter: function(d) {
                return d;
              },
              valueFormatter: yFormatter,
              headerFormatter: function(d) {
                return self.formatter(new Date(Number.parseInt(d)));
              },
            },
            duration: 500,
            xAxis: {
              axisLabel: 'Time',
              tickFormat: function(d) {
                return self.formatter(new Date(Number.parseInt(d)));
              },
            },
            yAxis: {
              tickFormat: yFormatter,
            },
          },
        };

        // if (graphConfig.chart.type !== 'multiBarChart') {
          // nvOptions.chart.xDomain = [
            // this.timerange.start,
            // this.timerange.end,
          // ];
        // }

        let fxFlex: number;
        switch (graphConfig.width) {
          case 1:
            fxFlex = 25;
            break;
          case 2:
            fxFlex = 50;
            break;
          case 4:
            fxFlex = 100;
            break;
          default:
            fxFlex = 100;
        }

        nvGroup.graphs.push({
          title:    graphConfig.title,
          fxFlex,
          options:  nvOptions,
          data:     [],
        });
      }
    }
  }

  private updateGroupData(groupIdx: number) {
    const groupConfig = this._config.groups[groupIdx];
    const groupData   = this.mData.groups[groupIdx];

    for (let idx = 0; idx < groupConfig.graphs.length; idx++) {
      const data: NVSeries[][] = [];
      for (const metrics of groupConfig.graphs[idx].metrics) {
        data.push(this.processNVGMetricsSeries(
          metrics, groupConfig.dimensionConfigs, groupData[metrics.name],
          {
            autoHideMetricsName: groupConfig.graphs[idx].metrics.length === 1,
          },
        ));
      }
      this.nvData.groups[groupIdx].graphs[idx].data = _.flatten(
        data, true,
      );
    }
  }

  private processNVGMetricsSeries(
    metrics: ui.metrics.MetricsPanlGraphMetricsConfig,
    dimensions: ui.metrics.MetricsPanelDimensionConfig[],
    data: MetricsData[],
    options: NVGMetricsSeriesOptions,
  ): NVSeries[] {
    const enabledDimensions = _.filter(dimensions, (x) => x.enabled);

    if (metrics.transform) {
      data = _.map(data, (d) => {
        const result = _.clone(d);
        result.metrics = _.mapObject(
          result.metrics,
          (metricsData) => {
            return _.mapObject(metricsData, (val: m.MetricsValue<any>) => {
              const v = m.operator.retrieveValue(val);
              return m[metrics.transform](v);
            });
          },
        );
        return result;
      });
    }

    const projectOptions = {
      dimensions:  _.map(enabledDimensions, (x) => x.name),
      metrics:     [metrics.name],
    };

    const projectedData = _.map(
      data, (x) => m.operator.projectMetricsData(x, projectOptions),
    );

    const totalData: {
      [metricsName: string]: { [ts: number]: m.MetricsValue<any>; };
    } = {};

    for (const singleData of projectedData) {
      const singleMetrics = singleData.metrics[metrics.name];
      if (singleMetrics == null) {
        continue;
      }
      _.each(singleMetrics, (val, dhash) => {
        const singleDimension = singleData.dimensions[dhash];
        const dimensionValues = _.map(
          enabledDimensions, (d) => singleDimension[d.name],
        );
        let newMetricsName  = metrics.displayName || metrics.name;

        if (options.autoHideMetricsName) {
          if (enabledDimensions.length === 1) {
            newMetricsName = dimensionValues[0] ?
              dimensionValues[0].toString() : 'unknown';
          } else if (enabledDimensions.length > 1) {
            newMetricsName = dimensionValues.join(',');
          }
        } else if (enabledDimensions.length > 0) {
          newMetricsName = newMetricsName + `{${dimensionValues.join(',')}}`;
        }

        if (totalData[newMetricsName] == null) {
          totalData[newMetricsName] = {};
        }
        const targetMetrics = totalData[newMetricsName];
        const ts = singleData.timerange.start;

        if (targetMetrics[ts] == null) {
          targetMetrics[ts] = val;
        } else {
          targetMetrics[ts] = m.operator.operate([targetMetrics[ts], val]);
        }
      });
    }

    const retrieve = metrics.retrieve;
    return _.map(totalData, (metricsData, metricsName) => {
      return {
        key: metricsName,
        values: _.map(this.intervalRangeTs, (ts: number) => {
          const d = metricsData[ts];
          return {
            label: ts,
            value: d == null ? 0 : m.operator.retrieveValue(d, retrieve),
          };
        }),
      };
    });
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

interface NVData {
  groups:  NVGData[];
}

interface NVGData {
  title:       string;
  dimensions:  ui.metrics.MetricsPanelDimensionConfig[];
  graphs:      NVGraphData[];
}

interface NVGraphData {
  title:    string;
  fxFlex:   number;
  options:  any;
  data:     NVSeries[];
}

interface NVGMetricsSeriesOptions {
  autoHideMetricsName?: boolean;
}

interface AsyncDataRequest {
  groupId:      number;
  metrics:      string[];
  dataPromise:  Promise<MetricsData[]>;
}

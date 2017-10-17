import * as _                       from 'underscore';
import * as moment                  from 'moment';

import { Component, OnInit, Input } from '@angular/core';

import { ui }                       from '@nodeswork/applet/dist/ui';
import { metrics as m }             from '@nodeswork/utils';

import { MetricsService }           from '../../_services';
import { MetricsData, NVSeries }    from '../../_models';

@Component({
  selector: 'app-metrics-panel',
  templateUrl: './metrics-panel.component.html',
  styleUrls: ['./metrics-panel.component.css']
})
export class MetricsPanelComponent implements OnInit {

  // UI fields
  granularity:      string;
  start:            string;
  end:              string;

  @Input() config:  object;
  @Input() role:    string;

  timerange:        {
    start:          number;
    end:            number;
  };
  formatter:         d3.time.Format;

  private  _config: ui.metrics.MetricsPanel;
  private  mData:   MData;

  nvData:   NVData;

  constructor(
    private metricsService: MetricsService,
  ) {
  }

  private initializeConfigs() {
    this._config       = this.config as any;
    const granularity  = this._config.rangeSelection.granularity;
    const scale        = granularity * 1000;
    this.granularity   = moment.duration(granularity, 'seconds').humanize();

    this.timerange = {
      start:  Math.ceil(
        this._config.rangeSelection.timerange.start / scale,
      ) * scale,
      end:    Math.ceil(
        this._config.rangeSelection.timerange.end / scale,
      ) * scale,
    };

    if (granularity >= 3600 * 24) {
      this.formatter = d3.time.format('%x');
    } else {
      this.formatter = d3.time.format('%x %H:%M');
    }

    this.start = this.formatter(new Date(this.timerange.start));
    this.end   = this.formatter(new Date(this.timerange.end));
  }

  async ngOnInit() {
    this.initializeConfigs();

    await this.fetchMData();
    await this.initializeNVData();

    for (let idx = 0; idx < this._config.groups.length; idx++) {
      this.updateGroupData(idx);
    }
  }

  private async fetchMData() {
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
          timerange:    this._config.rangeSelection.timerange,
          granularity:  this._config.rangeSelection.granularity,
          dimensions:   [],
        });

        for (const metricsName of request.metrics) {
          gData[metricsName] = data;
        }
      }

      this.mData.groups.push(gData);
    }
  }

  private initializeNVData() {
    this.nvData = { groups: [] };
    for (const groupConfig of this._config.groups) {
      const nvGroup = {
        title:  groupConfig.title,
        graphs: [],
      };
      this.nvData.groups.push(nvGroup);

      for (const graphConfig of groupConfig.graphs) {
        const nvOptions: any = {
          chart: {
            type:      graphConfig.chart.type,
            height:    250,
            margin :   {
              top:     40,
              right:   80,
              bottom:  50,
              left:    55
            },
            x: function(d){ return d.label; },
            y: function(d){ return d.value; },
            showValues: true,
            valueFormat: function(d){
              return d3.format(',.0f')(d);
            },
            tooltip: {
              keyFormatter: function(d) {
                return d;
              },
              valueFormatter: function(d) {
                return d3.format(',.0f')(d);
              },
              headerFormatter: function(d) {
                return d3.time.format('%x %H:%M')(new Date(Number.parseInt(d)));
              },
            },
            duration: 500,
            xAxis: {
              axisLabel: 'Time',
              tickFormat: function(d) {
                return d3.time.format('%x %H:%M')(new Date(Number.parseInt(d)));
              },
            },
            yAxis: {
              tickFormat: function(d) {
                return d3.format(',.0f')(d);
              },
            },
          },
        };

        if (graphConfig.chart.type !== 'multiBarChart') {
          nvOptions.chart.xDomain = [
            this.timerange.start,
            this.timerange.end,
          ];
        }

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
        let newMetricsName  = metrics.name;

        if (options.autoHideMetricsName) {
          if (enabledDimensions.length === 1) {
            newMetricsName = dimensionValues[0].toString() || 'unknown';
          } else if (enabledDimensions.length > 1) {
            newMetricsName = dimensionValues.join(',');
          }
        } else if (enabledDimensions.length > 0) {
          newMetricsName = metrics.name + `{${dimensionValues.join(',')}}`;
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

    return _.map(totalData, (metricsData, metricsName) => {
      return {
        key: metricsName,
        values: _.map(metricsData, (val: m.MetricsValue<any>, ts: any) => {
          return {
            label: ts,
            value: m.operator.retrieveValue(val),
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
  title:    string;
  graphs:   NVGraphData[];
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

import * as _   from 'underscore';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
}               from '@angular/core';

import { ui }   from '@nodeswork/applet/dist/ui';

@Component({
  selector: 'app-dropdown-multi-selection',
  templateUrl: './dropdown-multi-selection.component.html',
  styleUrls: ['./dropdown-multi-selection.component.css']
})
export class DropdownMultiSelectionComponent implements OnInit {

  @Input() ngModel: any; // ui.metrics.MetricsPanelDimensionFilter;
  @Output() change = new EventEmitter<any>();

  filtering: boolean;

  constructor() { }

  ngOnInit() {
    this.updateFiltering();
  }

  updateFiltering() {
    this.filtering = _.chain(this.ngModel.filters)
      .map((f: any) => f.selected)
      .union()
      .value().length > 1;
  }

  onToggle() {
    this.ngModel.enabled = !this.ngModel.enabled;
    this.onChange();
  }

  onChange() {
    this.updateFiltering();
    this.change.emit();
  }

  selectAll() {
    _.each(this.ngModel.filters, (f: any) => {
      f.selected = true;
    });
  }

  selectNone() {
    _.each(this.ngModel.filters, (f: any) => {
      f.selected = false;
    });
  }
}

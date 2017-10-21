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

  constructor() { }

  ngOnInit() {
  }

  onToggle() {
    this.ngModel.enabled = !this.ngModel.enabled;
    this.onChange();
  }

  onChange() {
    console.log(this.ngModel)
    this.change.emit();
  }
}

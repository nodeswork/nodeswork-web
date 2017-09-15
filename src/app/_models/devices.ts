import { CommonModel } from './common';

export interface Device extends CommonModel {
  name:    string;
  os:      string;
  online:  boolean;
}

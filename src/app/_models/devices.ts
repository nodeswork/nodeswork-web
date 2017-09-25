import { CommonModel }               from './common';
import { AppletImage, AppletStatus } from './applets';

export interface Device extends CommonModel {
  name:              string;
  os:                string;
  online:            boolean;
  runningApplets:    AppletStatus[];
  installedApplets:  AppletImage[];
  scheduledApplets:  AppletImage[];
}

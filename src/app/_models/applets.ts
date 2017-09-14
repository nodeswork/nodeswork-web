import { CommonModel } from './common';
import { Device }      from './devices';

export interface Applet extends CommonModel {
  name:             string;
  owner:            any;
  imageUrl:         string;
  description:      string;
  tokens:           AppletTokens;
  permission:       string;
  configHistories:  AppletConfig[];
  config:           AppletConfig;
}

export interface AppletTokens {
  devToken:   string;
  prodToken:  string;
}

export interface AppletConfig {
  _id:          string;
  na:           string;
  naVersion:    string;
  packageName:  string;
  version:      string;
  workers:      AppletWorkerConfig[];
}

export interface AppletWorkerConfig {
  name:      string;
  schedule:  string;
}

export interface UserApplet extends CommonModel {
  user:             string;
  applet:           Applet;
  config:           UserAppletConfig;
  enabled:          boolean;
}

export interface UserAppletConfig {
  appletConfig:  AppletConfig;
  devices:       UserAppletDeviceConfig[];
  upToDate:      boolean;
}

export interface UserAppletDeviceConfig {
  device: string;
}

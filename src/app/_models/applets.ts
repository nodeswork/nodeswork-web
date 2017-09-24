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
  naType:       string;
  naVersion:    string;
  packageName:  string;
  version:      string;
  workers:      AppletWorkerConfig[];
  accounts:     AppletAccountConfig[];
}

export interface AppletWorkerConfig {
  name:      string;
  schedule:  string;
}

export interface AppletAccountConfig {
  accountType: string;
  provider:    string;
  optional:    boolean;
  multiple:    boolean;
}

export interface UserApplet extends CommonModel {
  user:             string;
  applet:           Applet;
  config:           UserAppletConfig;
  enabled:          boolean;
  stats:            UserAppletStats;
}

export interface UserAppletConfig {
  appletConfig:  AppletConfig;
  devices:       UserAppletDeviceConfig[];
  accounts:      UserAppletAccountConfig[];
  upToDate:      boolean;
}

export interface UserAppletStats {
  online:   boolean;
  reason?:  string;
  status?:  string;
}

export interface UserAppletDeviceConfig {
  device: string;
}

export interface UserAppletAccountConfig {
  account: string;
}

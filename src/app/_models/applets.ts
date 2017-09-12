export interface Applet {
  _id:              string;
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

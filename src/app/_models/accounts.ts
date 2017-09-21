import { CommonModel } from './common';

export interface AccountCategory {
  accountType: string;
  provider:    string;
  name:        string;
  imageUrl:    string;
}

export interface Account extends CommonModel {
  accountType:      string;
  provider:         string;
  name:             string;
  verified:         boolean;
  accountCategory:  AccountCategory;
}

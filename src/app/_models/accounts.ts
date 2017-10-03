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

export namespace fifa18 {

  export interface FifaFut18Account extends Account {
    email:            string;
  }

  export interface Fifa18VerifyResponse {
    status:    string;
    metadata:  Fifa18ClientMetadata;
  }

  export interface Fifa18ClientMetadata {

    state?:                        string;
    stateIndex?:                   number;
    errors?:                       object;
    gameSku?:                      string;
    gameSkuChoices?:               string[];

    securityCodeVerificationUrl?:  string;

    accessToken?:                  string;
    tokenType?:                    string;

    pid?:                          PID;
    authCode?:                     string;
    sharedInfo?:                   ShareInfo[];
    sharedHost?:                   string;

    userAccountInfo?:              UserAccountInfo;
    auth?:                         Auth;
    phishingQuestionId?:           number;
  }

  export interface PID {
    pidId:                         number;
    [key: string]:                 any;
  }

  export interface ShareInfo {
    clientFacingIpPort:  string;
    clientProtocol:      string;
    customdata1:         string[];
    platforms:           string[];
    shardId:             string;
    skus:                string[];
  }

  export interface UserAccountInfo {
    personas:            UserAccountPersona[];
  }

  export interface UserAccountPersona {
    userClubList:        UserClub[];
    trial:               boolean;
    returningUser:       string;
    personaName:         string;
    personaId:           string;
  }

  export interface UserClub {
    skuAccessList:   object;
    badgeId:         number;
    divisionOnline:  number;
    established:     number;
    clubAbbr:        string;
    clubName:        string;
    platform:        string;
    lastAccessTime:  string;
    teamId:          string;
    assetId:         string;
    year:            string;
  }

  export interface Auth {
    ipPort:    string;
    protocol:  string;
    sid:       string;
  }

  export const STATES = {
    INITIALIZED:                 'INITIALIZED',
    REQUIRE_LOGIN:               'REQUIRE_LOGIN',
    REQUIRE_SECURITY_CODE:       'REQUIRE_SECURITY_CODE',
    REQUIRE_GAME_SKU:            'REQUIRE_GAME_SKU',
    REQUIRE_PHISHING_QUESTIONS:  'REQUIRE_PHISHING_QUESTIONS',
    READY:                       'READY',
  };

  export const STATE_INDEX: StateIndex = {
    INITIALIZED:                 0,
    REQUIRE_LOGIN:               1,
    REQUIRE_SECURITY_CODE:       2,
    REQUIRE_GAME_SKU:            3,
    REQUIRE_PHISHING_QUESTIONS:  4,
    READY:                       5,
  };

  export interface StateIndex {
    INITIALIZED:                 number;
    REQUIRE_LOGIN:               number;
    REQUIRE_SECURITY_CODE:       number;
    REQUIRE_GAME_SKU:            number;
    REQUIRE_PHISHING_QUESTIONS:  number;
    READY:                       number;
    [state: string]:             number;
  }

  export const DEFAULT_METADATA = {
    state:       STATES.INITIALIZED,
    stateIndex:  STATE_INDEX.INITIALIZED,
  };
}

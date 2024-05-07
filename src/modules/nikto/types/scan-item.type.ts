export interface NiktoScanItem {
    _attributes: {
      id: string;
      osvdbid: string;
      osvdblink: string;
      method: string;
    };
    description: {
      _cdata: string;
    };
    uri: {
      _cdata: string;
    };
    namelink: {
      _cdata: string;
    };
    iplink: {
      _cdata: string;
    };
  }
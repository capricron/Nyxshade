import { NiktoScanItem } from "./scan-item.type";

export interface NiktoScanResult {
    _declaration: {
      _attributes: {
        version: string;
      };
    };
    _doctype: string;
    niktoscan: {
      _attributes: {
        hoststest: string;
        options: string;
        version: string;
        scanstart: string;
        scanend: string;
        scanelapsed: string;
        nxmlversion: string;
      };
      scandetails: {
        _attributes: {
          targetip: string;
          targethostname: string;
          targetport: string;
          targetbanner: string;
          starttime: string;
          sitename: string;
          siteip: string;
          hostheader: string;
          errors: string;
          checks: string;
        };
        item: NiktoScanItem[];
      };
      statistics: {
        _attributes: {
          elapsed: string;
          itemsfound: string;
          itemstested: string;
          endtime: string;
        };
      };
    };
  }
  
  
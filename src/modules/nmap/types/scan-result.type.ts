export interface NmapScanResult {
    port:{
        _attributes:{
            protocol: string;
            portid: string;
        };
        state:{
            _attributes:{
                state: string;
                reason: string;
            };
        };
        service:{
            _attributes:{
                name: string;
                product: string;
                version: string;
                extrainfo: string;
                method: string;
                conf: string;
            };
        };
    }[];
}
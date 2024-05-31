export interface responseNmap {
    protocol: string;
    portid: string;
    state: {
        state: string;
        reason: string;
    };
    service: any;   
}
import { NiktoScanResult } from "../../nikto/types/scan-result.type";
import { NmapScanResult } from "../../nmap/types/scan-result.type";

export interface hostResult {
    name: string,
    ip: string,
    nikto: NiktoScanResult,
    nmap: NmapScanResult
}
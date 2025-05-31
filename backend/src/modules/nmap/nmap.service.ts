import { writeFileSync, readFileSync } from "fs";
import { xml2json } from "xml-js";
import { NmapScanResult } from "./types/scan-result.type";
import { responseNmap } from "./types/res-nmap.type";
import { NmapRepository } from "./nmap.repository";
import { $ } from "bun";
import clearScan from "../../helpers/clear_scan.helper";

const nmapRepo = new NmapRepository();

export class NmapService {
    public async nmapScan(ip: any){
    
        await clearScan('nmap', ip);
        // await $`nmap -A ${ip} -oX src/temp/nmap/${ip}.xml`
        await $`nmap ${ip} -Pn -p- -A -oX src/temp/nmap/${ip}.xml`
        const xmlData = readFileSync(`src/temp/nmap/${ip}.xml`, "utf8");
        const jsonData: any = xml2json(xmlData, { compact: true, spaces: 2 });
        writeFileSync(`src/temp/nmap/${ip}.json`, jsonData);

        const data: NmapScanResult[] = JSON.parse(readFileSync(`src/temp/nmap/${ip}.json`, "utf8")).nmaprun.host.ports.port;

        const formattedData: responseNmap[] = data.map((item: any) => {
            const { protocol, portid } = item._attributes;

            const { state } = item.state._attributes;
            
            const { service } = item;

            return { protocol, portid, state, service };
        });

        await nmapRepo.createNmapScanItem(ip, formattedData);


        return formattedData;
    }

    public async nmapHistory(ip: any){
        try{
            return JSON.parse(readFileSync(`./data/${ip}/nmap.json`, 'utf8'));
        }catch{
            return false;
        }
    }
}
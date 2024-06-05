import { $ } from "bun";
import { writeFileSync, readFileSync } from "fs";
import { xml2json } from "xml-js";
import { NiktoScanItem } from "./types/scan-item.type";
import { NiktoScanResult } from "./types/scan-result.type";
import { responseNikto } from "./types/res-nikto.type";
import { NiktoRepository } from "./nikto.repository";
import clearScan from "../../helpers/clear_scan.helper";

const niktoRepo = new NiktoRepository();

export class NiktoService {
    public async niktoScan(ip: any) {
  
        try{
            // await clearScan('nikto');

            try{
                await $`nikto --host ${ip} --output src/temp/nikto/${ip}.xml`;
            }catch{}

            const xmlData = readFileSync(`./src/temp/nikto/${ip}.xml`, `utf8`);
            const jsonData: any = xml2json(xmlData, { compact: true, spaces: 2 });
            
            writeFileSync(`src/temp/nikto/${ip}.json`, jsonData);
            
            const data = JSON.parse(readFileSync(`src/temp/nikto/${ip}.json`, "utf8"));
            console.log(data.niktoscans.niktoscan);
            const item: NiktoScanItem[] = data.niktoscans.niktoscan.scandetails.item
            const formattedData: responseNikto[] = item.map((item) => {
                // Destructuring to extract relevant properties
                const { description: { _cdata: description }, uri: { _cdata: uri }, namelink: { _cdata: namelink } } = item;
              
                // Create a new object with the desired properties and types
                return { method: item._attributes.method, description, uri, namelink };
            });

            await niktoRepo.createNiktoScanItem(ip, formattedData);

            return formattedData;            
        }catch(e){
            return false;
        }    
    }

    public async niktoData(ip: string){
        const niktoData = await JSON.parse(readFileSync(`data/${ip}/nikto.json`, "utf8"))
        return niktoData;
    }

}
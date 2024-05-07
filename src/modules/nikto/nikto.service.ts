import { $ } from "bun";
import { writeFileSync, readFileSync } from "fs";
import { xml2json } from "xml-js";
import { NiktoScanItem } from "./types/scan-item.type";
import { NiktoScanResult } from "./types/scan-result.type";
import { responseNikto } from "./types/res-nikto.type";
import { NiktoRepository } from "./nikto.repository";

const niktoRepo = new NiktoRepository();

export class NiktoService {
    public async niktoScan(c: any) {
        const {ip} = c.req.param();
        try{
            // await $`nikto --host ${ip} --output src/temp/nikto/nikto.xml`;

            const xmlData = readFileSync("src/temp/nikto/nikto.xml", "utf8");

            const jsonData: any = xml2json(xmlData, { compact: true, spaces: 2 });

            writeFileSync("src/temp/nikto/nikto.json", jsonData);

            const data: NiktoScanResult = JSON.parse(readFileSync("src/temp/nikto/nikto.json", "utf8"));
            const item: NiktoScanItem[] = data.niktoscan[0].scandetails.item

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

}
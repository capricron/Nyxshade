import { writeFileSync, readFileSync } from "fs";
import { hostScan } from "./types/host_scan.type";

export class HostRepository {
    async createHost(newData: hostScan){
        const fileName = 'data/host.json';

        try {
            const data = readFileSync(fileName, 'utf8');
            let jsonData = JSON.parse(data);
            console.log(jsonData)
            jsonData.push(newData);            
            const updatedJsonData = JSON.stringify(jsonData, null, 2);
            writeFileSync(fileName, updatedJsonData, 'utf8');            
            console.log('Data berhasil ditambahkan!');
        } catch (err) {
            console.error('Gagal membaca atau menulis file:', err);
        }
    }
}
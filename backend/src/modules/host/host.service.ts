import axios from "axios"
import { env } from "bun";
import formatDate from "../../helpers/format_date.helper";
import { hostScan } from "./types/host_scan.type";
import { HostRepository } from "./host.repository";
import { NmapScanResult } from "../nmap/types/scan-result.type";
import { NiktoScanResult } from "../nikto/types/scan-result.type";
import { AIGenerate } from "../../helpers/ai";

const hostRepo = new HostRepository();
const fs = require('fs');

export class HostService {
    public async scanNew(
        host: string,
        name: string,
        nmap: boolean,
        nikto: boolean,
        nuclei: boolean
    ) {

        // // membuet folder data jika belum ada
        // const dir = `data/${host}`;

        // fs.mkdirSync(dir, {
        //     recursive: true
        // });


        // // console.log(host)
        // const host_active = await axios.get(`${process.env.URL_LOCAL}/ping/${host}`)

        // if (host_active.data.status != 200) {
        //     return false;
        // }


        if (nmap) {
            await axios.post(`${process.env.URL_LOCAL}/nmap/${host}`);
        }


        if (nikto) {
            await axios.post(`${process.env.URL_LOCAL}/nikto/${host}`)
        }

        // // panggil fucntion AIGenerate
        // const resume: any = await AIGenerate(
        //     "Buatkan ringkasan hasil scan host berikut ini: " + host + "\n\n"
        //     + "Hasil scan Nmap: \n" + 
        //     fs.readFileSync(`data/${host}/nmap.json`, 'utf8') + "\n\n"
        //     +
        //     "Hasil scan Nikto: \n" + 
        //     fs.readFileSync(`data/${host}/nikto.json`, 'utf8') + "\n\n"
        //     +
        //     "Buat ringkasan yang singkat dan jelas, sertakan informasi penting seperti port yang terbuka, layanan yang berjalan, dan potensi kerentanan yang ditemukan.",
        // )

        // // simpan hasil resume ke file data/host/{host}/resume.txt
        // const resumeFilePath = `data/${host}/resume.txt`;
        // fs.writeFileSync(resumeFilePath, resume);

        // const niktoResult = await axios.post(`${process.env.URL_LOCAL}/nikto/${host}`)
        const time = new Date().toISOString();
        const newData: hostScan = {
            name,
            host,
            last_scan: formatDate(time),
        }

        await hostRepo.createHost(newData)

        // sleep 2 second
        // await new Promise(resolve => setTimeout(resolve, 10000));

        return {
            name,
            host,
            last_scan: formatDate(time),
        }
    }
}
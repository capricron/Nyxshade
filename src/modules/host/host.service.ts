import axios from "axios"
import { env } from "bun";
import formatDate from "../../helpers/format_date.helper";
import { hostScan } from "./types/host_scan.type";
import { HostRepository } from "./host.repository";
import { NmapScanResult } from "../nmap/types/scan-result.type";
import { NiktoScanResult } from "../nikto/types/scan-result.type";

const hostRepo = new HostRepository();

export class HostService {
    public async scanNew(
        host: string, 
        name: string,
        nmap: boolean,
        nikto: boolean,
        nuclei: boolean
        ){

        // console.log(host)
        const host_active = await axios.get(`${process.env.URL_LOCAL}/ping/${host}`)

        if(host_active.data.status != 200){
            return false;
        }

        console.log(host_active)

        if(nmap){
            await axios.post(`${process.env.URL_LOCAL}/nmap/${host}`)
        }

        if(nikto){
            await axios.post(`${process.env.URL_LOCAL}/nikto/${host}`)
        }

        // const niktoResult = await axios.post(`${process.env.URL_LOCAL}/nikto/${host}`)
        const time = new Date().toISOString();
        const newData: hostScan = {
            name,
            host,
            last_scan : formatDate(time),
        }
        
        await hostRepo.createHost(newData)

        // sleep 2 second
        // await new Promise(resolve => setTimeout(resolve, 10000));

        return {
            name,
            host,
            last_scan : formatDate(time),
        }
    }
}
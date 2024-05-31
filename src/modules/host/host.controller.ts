import axios from "axios";
import { env } from "bun";
import { writeFileSync, readFileSync } from "fs";
import formatDate from "../../helpers/format_date.helper";
import { hostScan } from "./types/host_scan.type";
import { HostService } from "./host.service";

const hostService = new HostService();

export class HostController {
    public async hostInformation(c: any) {
        const { ip } = c.req.param();

        const niktoData = await JSON.parse(readFileSync(`src/temp/nikto/${ip}.json`, "utf8"))
        
        const nmapData = await JSON.parse(readFileSync(`src/temp/nmap/${ip}.json`, "utf8"))
        
        return c.json({
            status: 200,
            message: "Success get data host",
            data: {
                niktoData,
                nmapData
            }
        })
    }

    public async allHost(c: any){
        
        const data = JSON.parse(readFileSync('data/host.json', 'utf8'));

        return c.json({
            status: 200,
            message: "Success get all host",
            data
        })

    }

    public async newScan(c: any){
        const { name, host, nmap, nikto, nuclei } = await c.req.json();

        const response = await hostService.scanNew(
            host, 
            name,
            nmap,
            nikto,
            nuclei
        );

        // console.log(response)

        if(!response){
            return c.json({
                status: 400,
                message: "Invalid IP address"
            });
        }

        return c.json({
            status: 200,
            message: "Success add new host",
            data: response
        })

    }
}
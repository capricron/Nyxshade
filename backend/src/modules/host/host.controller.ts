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

        const niktoData = await JSON.parse(readFileSync(`data/${ip}/nikto.json`, "utf8"))
        const hostData = await JSON.parse(readFileSync(`data/host.json`, "utf8"))
        const nmapData = await JSON.parse(readFileSync(`data/${ip}/nmap.json`, "utf8"))
        const resumeData = readFileSync(`data/${ip}/resume.txt`, "utf8");
        return c.json({
            status: 200,
            message: "Success get data host",
            data: {
                target_name: hostData.find((item: any) => item.host === ip).name,
                target_address: ip,
                niktoData,
                nmapData,
                resumeData,
            }
        })
    }

    public async resumeReport(c: any) {
        const { ip } = c.req.param();

        const niktoData = await JSON.parse(readFileSync(`data/${ip}/nikto.json`, "utf8"))
        const hostData = await JSON.parse(readFileSync(`data/host.json`, "utf8"))
        const nmapData = await JSON.parse(readFileSync(`data/${ip}/nmap.json`, "utf8"))

        return c.json({
            status: 200,
            message: "Success get data host",
            data: {
                target_name: hostData.find((item: any) => item.host === ip).name,
                niktoData,
                nmapData
            }
        })
    }

    public async allHost(c: any) {

        const data = JSON.parse(readFileSync('data/host.json', 'utf8'));

        return c.json({
            status: 200,
            message: "Success get all host",
            data
        })

    }

    public async newScan(c: any) {
        const { name, host, nmap, nikto, nuclei } = await c.req.json();

        const response = await hostService.scanNew(
            host,
            name,
            nmap,
            nikto,
            nuclei
        );


        if (!response) {
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
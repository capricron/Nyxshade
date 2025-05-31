
import { PingService } from "../ping/ping.service";
import { NiktoService } from "./nikto.service";
import { NiktoScanResult } from "./types/scan-result.type";
const serviceNikto = new NiktoService();
const pingService = new PingService();

export class NiktoController {
    public async niktoScan(c: any) {

        if(!await pingService.checkPing(c)){
            return c.json({
                status: 400,
                message: "Invalid IP address"
            });
        }

        const response = await serviceNikto.niktoScan(c.req.param().ip);

        if(response){
            return c.json({
                status: 200,
                message: "Nikto scan completed",
                data: response
            });
        }
        else{
            return c.json({
                status: 500,
                message: "Nikto scan failed"
            });
        }
    }

    public async niktoData(c: any){
        const { ip } = c.req.param();

        const response: NiktoScanResult = await serviceNikto.niktoData(ip)
        
        return c.json({
            status: 200,
            message: "Success get data host",
            data: response
        })
    }
}
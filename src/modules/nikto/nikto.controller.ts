
import { PingService } from "../ping/ping.service";
import { NiktoService } from "./nikto.service";
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

        const response = await serviceNikto.niktoScan(c);

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
}
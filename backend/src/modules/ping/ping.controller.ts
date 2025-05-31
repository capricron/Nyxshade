import { $ } from "bun";
import { PingService } from "./ping.service";
const servicePing = new PingService();

export class PingController {

    public async checkPing(c: any) {
        const response = await servicePing.checkPing(c);
        // console.log(response)
        if(response){
            return c.json({
                status: 200,
                message: "Host is reachable"
            });
        }
        else{
            return c.json({
                status: 500,
                message: "Host is unreachable"
            });
        }
    }

}
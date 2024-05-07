import {$} from "bun";

export class PingService {
    public async checkPing(c: any) {
        const {ip} = c.req.param();
        try{
            const ping = await $`ping -c 1 ${ip}`.text();
            console.log(ping)
            if(/100% packet loss/g.exec(ping)?.[0] != undefined){
                return false;
            }
            return true;
        }catch(e){
            return false;
        }
    }
}
import { NmapService } from "./nmap.service";

const serviceNmap = new NmapService();

export class NmapController {
    
    public async nmapScan(c: any) {
        const response = await serviceNmap.nmapScan(c.req.param().ip);

        if(response){
            return c.json({
                status: 200,
                message: "Nmap scan completed",
                data: response
            });
        }
        else{
            return c.json({
                status: 500,
                message: "Nmap scan failed"
            });
        }
    }

    public async nmapHistory(c: any){
        const response = await serviceNmap.nmapHistory(c.req.param().ip);

        if(response){
            return c.json({
                status: 200,
                message: "Nmap history",
                data: response
            });
        }
        else{
            return c.json({
                status: 500,
                message: "Nmap history not found"
            });
        }
    }

}

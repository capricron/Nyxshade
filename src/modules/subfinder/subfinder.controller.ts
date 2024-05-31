import { $ } from "bun";

export class SubfinderController{

    public async subfinderScan(ip: any){
        await $`subfinder -d ${ip} -o src/temp/subfinder/${ip}.txt`
        return `src/temp/subfinder/${ip}.txt`;       
    }

}
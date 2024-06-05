import { $ } from "bun";
import { readFileSync } from "fs";

export class SubfinderController{

    public async subfinderScan(c: any){
        const { ip } = c.req.param();
        console.log(ip)
        await $`subfinder -h`
        // await $`subfinder -d ${ip} -o src/${ip}/subfinder.txt`
        const data  = readFileSync(`src/${ip}/subfinder.txt`);

        // make txt to array
        const dataArray = data.toString().split('\n');

        console.log(dataArray[0])
    }

}
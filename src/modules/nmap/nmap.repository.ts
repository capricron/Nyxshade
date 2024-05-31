
import { $ } from "bun";

export class NmapRepository {

    async createNmapScanItem(ip: any, data: any) {
        const file = `./data/${ip}/nmap.json`;

        await $`mkdir ./data/${ip}`;
        await $`rm -rf ${file}`
        // looping data lalu masukan ke file json
    //    await data.forEach(async (item: any) => {
        await $`echo '${JSON.stringify(data)}' >> ${file}`
        // });
    }
}


import { eq } from "drizzle-orm";
import { $ } from "bun";


export class NiktoRepository {

    async createNiktoScanItem(ip: any, data: any) {
        const file = `./data/${ip}/nikto.json`;
        try{
            await $`mkdir ./data/${ip}`;
        }catch{}
        // await $`mkdir ./data/${ip}`;
        // await $`rm -rf ${file}`
        // looping data lalu masukan ke file json
    //    await data.forEach(async (item: any) => {
            await $`echo '${JSON.stringify(data)}' >> ${file}`
        // });
    }
}


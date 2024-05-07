import { eq } from "drizzle-orm";
import { db } from "../../db/db";
import { hosts } from "../../db/schema";


export class NiktoRepository {

    async createNiktoScanItem(ip: any, data: any) {

        const hostData = db.select().from(hosts).where(eq(hosts, String(ip))).execute();

        // if (hostData) {
        //     db.insert(hosts).values({ ip }).execute();
        // }

        // const host = prisma.host.findFirst({
        //     where: {
        //         ip: data.ip
        //     }
        // });

        // // jika tidak ditemukan maka create host
        // if (!host) {`
        //     await prisma.host.create({
        //         data: {
        //             ip
        //         }
        //     });
        // }

        // const nikto = await prisma.nikto.create({
        //     data
        // });

        return nikto;
    }
}


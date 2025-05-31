import { $ } from "bun";

export default async function clearScan(fitur :string, ip: string) {
    await $`rm -rf src/temp/${fitur}`;
    await $`mkdir src/temp/${fitur}`;
    await $`rm -rf data/${ip}/${fitur}.json`;   
}
import { $ } from "bun";

export default async function clearScan(fitur :string){
    await $`rm -rf src/temp/${fitur}`;
    await $`mkdir src/temp/${fitur}`;
}
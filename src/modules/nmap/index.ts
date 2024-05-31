import { Hono } from "hono";
import { NmapController } from "./nmap.controller";

const nmap = new Hono;
const nmapController = new NmapController();

nmap.post('/:ip', (c) => nmapController.nmapScan(c));
nmap.get('/:ip',  (c) => nmapController.nmapHistory(c));

export default nmap;
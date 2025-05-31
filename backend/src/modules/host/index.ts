import {Hono} from "hono";
import { HostController } from "./host.controller";

const host = new Hono;
const hostController = new HostController;

host.get('/', (c) => hostController.allHost(c));
host.get('/:ip', (c) => hostController.hostInformation(c));
host.post('/', (c) => hostController.newScan(c));
export default host
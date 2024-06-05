import { Hono } from "hono";
import { SubfinderController } from "./subfinder.controller";

const subfinder = new Hono;
const subfinderController = new SubfinderController();

subfinder.post('/:ip', (c) => subfinderController.subfinderScan(c));

export default subfinder;
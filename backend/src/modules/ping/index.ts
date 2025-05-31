import { Hono } from "hono";
import { PingController } from "./ping.controller";

const ping = new Hono;
const pingController = new PingController;

ping.get('/:ip', (c) => pingController.checkPing(c));

export default ping;
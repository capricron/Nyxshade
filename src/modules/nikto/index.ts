import { Hono } from "hono";
import { NiktoController } from "./nikto.controller";

const nikto = new Hono;
const niktoController = new NiktoController;

nikto.get('/:ip', (c) => niktoController.niktoScan(c));

export default nikto;
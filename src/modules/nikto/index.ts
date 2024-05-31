import { Hono } from "hono";
import { NiktoController } from "./nikto.controller";

const nikto = new Hono;
const niktoController = new NiktoController;

nikto.post('/:ip', (c) => niktoController.niktoScan(c));
nikto.get('/:ip', (c) => niktoController.niktoData(c) )

export default nikto;
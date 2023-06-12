import { Router } from "express";
import { methods as clienteController } from "../controllers/Cliente.controller";

const router = Router();

router.post("/solicitarPedidoalRestaurante", clienteController.crearPedido);
router.get("/validaEstadoPedidoalRestaurante/:noPedido", clienteController.estadoPedidoRestaurante);
router.get("/validaEstadoPedidoalRepartidor/:noPedido", clienteController.estadoPedidoRepartidor);
export default router;
import { Router } from "express";
import { methods as repartidorController } from "../controllers/Repartidor.controller";

const router = Router();

router.post("/recibirPedidodelRestaurante", repartidorController.crearPedido);
router.get("/informarEstadoPedidoalCliente/:noPedido", repartidorController.estadoPedido);
router.put("/marcaEntregadoelPedido", repartidorController.actualizarPedido);
export default router;
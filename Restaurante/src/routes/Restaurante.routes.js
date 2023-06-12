import { Router } from "express";
import { methods as RestauranteController } from "../controllers/Restaurante.controller";

const router = Router();

router.post("/recibirPedidodelCliente", RestauranteController.crearPedido);
router.get("/informarEstadoPedidoalCliente/:noPedido", RestauranteController.estadoPedido);
router.post("/avisarPedidoListoRepartidor", RestauranteController.listoPedido);
export default router;
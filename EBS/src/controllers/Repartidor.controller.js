import { getConnection } from "../database/database";
import axios  from "axios";

const crearPedido = async (req, res) => {
    try {
        const { nombreRepartidor, noPedido } = req.body;

        const estadoPedido = "cocinando";
        const tipoUsuario = "cliente"
        const listoPedido = "no"
        const nombreRestaurante = "El pollo feliz"
        const transaccion = "repartidor"
        const pedido = { noPedido, estadoPedido, tipoUsuario, listoPedido, nombreRestaurante, transaccion, nombreRepartidor};

        const connection = await getConnection();
        const result = await connection.query("INSERT INTO Tabla SET ?", pedido);

        const mensaje = "Repartidor: Solicitud de crear pedido para entregar";
        await connection.query("INSERT INTO Log (mensaje) values(?)", mensaje);
        res.json({ message: "Pedido agregado" });
    } catch (error) {
        res.status(500);
        console.log(error.message)
        res.send(error.message);
    }
};

const estadoPedido = async (req, res) => {
    try {
        const { noPedido } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT nombreUsuario,producto,noPedido,estadoPedido, nombreRestaurante FROM Tabla WHERE noPedido = ?", noPedido);

        const mensaje = "Repartidor: Solicitud de estado de pedido";
        await connection.query("INSERT INTO Log (mensaje) values(?)", mensaje);
        res.json(result);
    } catch (error) {
        res.status(500);
        console.log(error.message)
        res.json(error.message);
    }
};
const actualizarPedido = async (req, res) => {
    try {
        const { estadoPedido, noPedido } = req.body;

        const connection = await getConnection();
        const result = await connection.query("UPDATE Tabla SET estadoPedido = ? WHERE noPedido = ?", [estadoPedido, noPedido]);

        const mensaje = "Repartidor: Solicitud de actualizar pedido";
        await connection.query("INSERT INTO Log (mensaje) values(?)", mensaje);
        res.status(200).json({ message: "Usuario actualizado" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
export const methods = {
    crearPedido,
    estadoPedido,
    actualizarPedido
};
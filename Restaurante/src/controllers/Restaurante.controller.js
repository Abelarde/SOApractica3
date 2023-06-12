import { getConnection } from "../database/database";
import axios  from "axios";
const crearPedido = async (req, res) => {
    try {
        const { nombreUsuario, producto } = req.body;

        const noPedido = Math.floor(Math.random() * (999 - 0 + 1)) + 0;
        const estadoPedido = "cocinando";
        const tipoUsuario = "cliente"
        const listoPedido = "no"
        const nombreRestaurante = "El pollo feliz"
        const transaccion = "restaurante"
        const nombreRepartidor = "repartidor1"
        const pedido = { nombreUsuario, producto, noPedido, estadoPedido, tipoUsuario, listoPedido, nombreRestaurante, transaccion, nombreRepartidor};

        const connection = await getConnection();
        const result = await connection.query("INSERT INTO Tabla SET ?", pedido);
        const mensaje = "Restaurante: Solicitud de crear pedido";
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
        const connection = await  getConnection();
        const result = await connection.query("SELECT nombreUsuario,producto,noPedido,estadoPedido, nombreRestaurante FROM Tabla WHERE noPedido = ?;", [noPedido]);

        const mensaje = "Restaurante: Solicitud para saber el estado del pedido";
        await connection.query("INSERT INTO Log (mensaje) values(?)", mensaje);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const listoPedido = async (req, res) => {

    const { nombreRepartidor, noPedido } = req.body;

    const connection = await  getConnection();
    const mensaje = "Restaurante: Solicitud para informar que el pedido esta listo";
    await connection.query("INSERT INTO Log (mensaje) values(?)", mensaje);

    // Realizar una solicitud al otro endpoint
    axios.post('http://localhost:8081/repartidor/recibirPedidodelRestaurante', {
        nombreRepartidor: nombreRepartidor,
        noPedido: noPedido // Este es el segundo parametro que quieres enviar
    })
        .then((response) => {
            // Manejar la respuesta del endpoint2
            res.status(200).json(response.data);
        })
        .catch((error) => {
            // Manejar cualquier error en la solicitud
            console.log(error.message)
            res.status(500).send(error.message);
        });
};
export const methods = {
    crearPedido,
    estadoPedido,
    listoPedido
};
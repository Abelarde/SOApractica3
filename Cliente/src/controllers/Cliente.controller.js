import { getConnection } from "../database/database";
import axios  from "axios";
const crearPedido = async (req, res) => {

    const { nombreUsuario, producto } = req.body;
    const pedido = {nombreUsuario, producto}

    const connection = await getConnection();
    const mensaje = "Cliente: Solicitud de crear de pedido";
    await connection.query("INSERT INTO Log (mensaje) values(?)", mensaje);

    // Realizar una solicitud al otro endpoint
    axios.post('http://localhost:8082/restaurante/recibirPedidodelCliente', pedido)
        .then((response) => {
            // Manejar la respuesta del endpoint2
            res.status(200).json(response.data);
        })
        .catch((error) => {
            // Manejar cualquier error en la solicitud
            res.status(500).send(error.message);
        });
};
const estadoPedidoRestaurante = async (req, res) => {
    const { noPedido } = req.params;

    const connection = await getConnection();
    const mensaje = "Cliente: Solicitud informacion del estado del pedido hacie el restaurante";
    await connection.query("INSERT INTO Log (mensaje) values(?)", mensaje);
    // Realizar una solicitud GET al otro endpoint
    axios.get(`http://0.0.0.0:8082/restaurante/informarEstadoPedidoalCliente/${noPedido}`)
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
const estadoPedidoRepartidor = async (req, res) => {
    const { noPedido } = req.params;

    const connection = await getConnection();
    const mensaje = "Cliente: Solicitud de crear de pedido hacia el repartidor";
    await connection.query("INSERT INTO Log (mensaje) values(?)", mensaje);
    // Realizar una solicitud GET al otro endpoint
    axios.get(`http://localhost:8081/repartidor/informarEstadoPedidoalCliente/${noPedido}`)
        .then((response) => {
            // Manejar la respuesta del endpoint2
            res.status(200).json(response.data);
        })
        .catch((error) => {
            // Manejar cualquier error en la solicitud
            console.log(error.message)
            res.status(500).json(error.message);
        });
};
export const methods = {
    crearPedido,
    estadoPedidoRestaurante,
    estadoPedidoRepartidor
};
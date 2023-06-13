/*import app from "./app";

const main = () => {
    app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
};

main();*/


const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Endpoint para recibir mensajes
app.post('/esb/solicitarPedido', async (req, res) => {
    const mensaje = req.body;
    const respuesta = await enviarMensaje('http://0.0.0.0:8080/cliente/solicitarPedidoalRestaurante', mensaje);
    res.json(respuesta);
});

app.get('/esb/estado/restaurante/:noPedido', async (req, res) => {
    const { noPedido } = req.params;
    const respuesta = await recibirMensaje(`http://0.0.0.0:8080/cliente/validaEstadoPedidoalRestaurante/${noPedido}`);
    res.json(respuesta);
});

app.get('/esb/estado/repartidor/:noPedido', async (req, res) => {
    const { noPedido } = req.params;
    const respuesta = await recibirMensaje(`http://0.0.0.0:8080/cliente/validaEstadoPedidoalRepartidor/${noPedido}`);
    res.json(respuesta);
});

// Función para enviar el mensaje a otro servicio
async function enviarMensaje(url, mensaje) {
    try {
        const respuesta = await axios.post(url, mensaje);
        return respuesta.data;
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
        throw error;
    }
}

async function recibirMensaje(url) {
    try {
        const respuesta = await axios.get(url);
        return respuesta.data;
    } catch (error) {
        console.error('Error al recibir el mensaje:', error);
        throw error;
    }
}

app.listen(3000, () => {
    console.log('ESB escuchando en el puerto 3000');
});

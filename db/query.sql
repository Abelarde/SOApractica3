USE mydatabase;

CREATE TABLE Tabla(
	nombreUsuario VARCHAR(100),
	producto VARCHAR(100),
    noPedido INT NOT NULL,
    estadoPedido VARCHAR(100), -- cocinando, en camino, entregado
    tipoUsuario VARCHAR(100),  -- cliente, repartidor, restaurante
    listoPedido VARCHAR(100),  -- si, no
	nombreRestaurante VARCHAR(100),  --
	transaccion VARCHAR(100)
);

CREATE TABLE Log(
    mensaje VARCHAR(100)
);
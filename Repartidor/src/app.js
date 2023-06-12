import express from "express";
import morgan from "morgan";
import cors from 'cors'

// Routes
import RepartidorRoutes from "./routes/Repartidor.routes";

const app = express();
app.use(cors())

// Settings
app.set("port", 8081);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/repartidor", RepartidorRoutes);

export default app;
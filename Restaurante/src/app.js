import express from "express";
import morgan from "morgan";
import cors from 'cors'

// Routes
import RestauranteRoutes from "./routes/Restaurante.routes";

const app = express();
app.use(cors())

// Settings
app.set("port", 8082);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/restaurante", RestauranteRoutes);

export default app;
import express from "express";
import morgan from "morgan";
import cors from 'cors'

// Routes
import ClienteRoutes from "./routes/Cliente.routes";

const app = express();
app.use(cors())

// Settings
app.set("port", 8080);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/cliente", ClienteRoutes);

export default app;
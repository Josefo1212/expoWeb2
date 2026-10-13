import express from "express";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import { requestLogger } from "./middleware/request.logger.js";

const app = express();

app.use(express.json());
app.use(requestLogger);

app.get("/", (_req, res) => {
  res.json({
    message: "API JWT funcionando"
  });
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.use((_req, res) => {
  res.status(404).json({
    message: "Ruta no encontrada"
  });
});

app.use((error, _req, res, _next) => {
  console.error(error);

  if (error.type === "entity.parse.failed") {
    return res.status(400).json({
      message: "JSON malformado"
    });
  }

  return res.status(500).json({
    message: "Error interno del servidor"
  });
});

export default app;

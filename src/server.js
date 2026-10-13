import "dotenv/config";
import app from "./app.js";

const port = process.env.PORT || 3000;
const IP = process.env.IP || "localhost";

if (!process.env.JWT_SECRET) {
  throw new Error("La variable JWT_SECRET no esta configurada");
}

app.listen(port, IP, () => {
  console.log(`Servidor ejecutandose en http://${IP}:${port}`);
});

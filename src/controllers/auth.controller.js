import jwt from "jsonwebtoken";
import users from "../data/users.js";

export const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    console.warn(`[AUTH] Intento de login incompleto para: ${username || "sin usuario"}`);

    return res.status(400).json({
      message: "El usuario y la contrasena son obligatorios"
    });
  }

  const user = users.find(
    (item) => item.username === username && item.password === password
  );

  if (!user) {
    console.warn(`[AUTH] Login rechazado para: ${username}`);

    return res.status(401).json({
      message: "Credenciales invalidas"
    });
  }

  const token = jwt.sign(
    {
      sub: String(user.id),
      username: user.username,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
      issuer: process.env.JWT_ISSUER || "https://api.academia-jwt.com",
      audience: process.env.JWT_AUDIENCE || "https://clientes.academia-jwt.com",
      algorithm: "HS256"
    }
  );

  console.log(`[AUTH] Login exitoso para: ${user.username}`);

  return res.json({
    message: "Login exitoso",
    token
  });
};

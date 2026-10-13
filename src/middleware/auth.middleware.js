import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    console.warn(`[AUTH] Token no proporcionado para ${req.method} ${req.originalUrl}`);

    return res.status(401).json({
      message: "Token no proporcionado"
    });
  }

  const token = authorization.slice("Bearer ".length);

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
      issuer: process.env.JWT_ISSUER || "https://api.academia-jwt.com",
      audience: process.env.JWT_AUDIENCE || "https://clientes.academia-jwt.com"
    });
    console.log(`[AUTH] Token valido para: ${req.user.username}`);

    return next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.warn(`[AUTH] Token expirado para ${req.method} ${req.originalUrl}`);

      return res.status(401).json({
        message: "Token expirado"
      });
    }

    console.warn(`[AUTH] Token invalido para ${req.method} ${req.originalUrl}`);

    return res.status(401).json({
      message: "Token invalido"
    });
  }
};

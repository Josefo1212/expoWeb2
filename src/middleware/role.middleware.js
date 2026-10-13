export const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user?.role)) {
    console.warn(
      `[AUTH] Acceso rechazado por rol para ${req.method} ${req.originalUrl}`
    );

    return res.status(403).json({
      message: "No tienes permisos para esta accion"
    });
  }

  next();
};

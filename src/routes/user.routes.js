import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

const router = Router();

router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Acceso autorizado",
    user: req.user
  });
});

router.get("/admin", verifyToken, requireRole("admin"), (req, res) => {
  res.json({
    message: "Acceso de administrador autorizado",
    user: req.user
  });
});

export default router;

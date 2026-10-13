import { Router } from "express";
import { login } from "../controllers/auth.controller.js";

const router = Router();

/*
  GUIA PARA PROBAR ESTE PROYECTO EN THUNDER CLIENT

  1. En la otra laptop:
     - Instalar Node.js y pnpm.
     - Copiar el proyecto completo junto con el archivo .env.
     - Ejecutar en la carpeta del proyecto:
         pnpm install
         pnpm dev
     - El servidor quedara disponible en:
         http://localhost:3000

  2. Login:
     Metodo: POST
     URL: http://localhost:3000/auth/login
     Headers:
       Content-Type: application/json
     Body -> JSON:
       {
         "username": "admin",
         "password": "123456"
       }

     Tambien se puede probar con el usuario normal:
       {
         "username": "usuario",
         "password": "123456"
       }

     La respuesta exitosa contiene un campo "token". Copiar ese token
     completo para usarlo en las rutas protegidas.

  3. Perfil del usuario autenticado:
     Metodo: GET
     URL: http://localhost:3000/users/profile
     Headers:
       Authorization: Bearer TU_TOKEN_JWT

  4. Ruta exclusiva para administradores:
     Metodo: GET
     URL: http://localhost:3000/users/admin
     Headers:
       Authorization: Bearer TU_TOKEN_JWT
     El token debe haber sido obtenido iniciando sesion con:
       username: admin
       password: 123456

  5. Ruta de verificacion del servidor:
     Metodo: GET
     URL: http://localhost:3000/

  Respuestas utiles:
     - 200: solicitud exitosa.
     - 400: falta username/password o el JSON es invalido.
     - 401: credenciales invalidas, token ausente, invalido o expirado.
     - 403: el usuario autenticado no tiene rol de administrador.
*/
router.post("/login", login);

export default router;

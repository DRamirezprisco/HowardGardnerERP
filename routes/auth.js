const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");

//Rutas de autenticación
authRouter.post("/registrar", authController.registarUsuario);
authRouter.post("/login", authController.autenticarUsuario);

module.exports = authRouter;

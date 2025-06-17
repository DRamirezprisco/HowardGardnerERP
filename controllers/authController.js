const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//crear y registar usuarios
exports.registarUsuario = async (req, res) => {
  const { firstName, email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }
    usuario = new Usuario({ firstName, email, password });
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);
    await usuario.save();

    const payload = { usuario: { id: usuario.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 1800,
    });
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

//autenticar los usuarios
exports.autenticarUsuario = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ message: "El usuario no existe" });
    }

    const esMatch = await bcrypt.compare(password, usuario.password);
    if (!esMatch) {
      return res.estatud(400).json({ msg: "Contraseña incorrecta" });
    }

    const payload = { usuario: { id: usuario.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 1800,
    });
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Error en el servidor" });
  }
};

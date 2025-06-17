require("dotenv").config();

const express = require("express");
const conectarDB = require("./config/db");
const router = require("./routes/student");
const authRouter = require("./routes/auth");

const app = express();

conectarDB();

const port = 3000;

app.use(express.json());
app.use("/api", router);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log("Servidor corriendo en http://localhost:${port}");
});

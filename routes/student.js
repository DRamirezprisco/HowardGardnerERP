const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");
const auth = require("../middlewares/auth");

//Rutas
router.post("/student", auth, studentController.crearStudent);

router.get("/students", studentController.obtenerStudent);
router.get("/student/:documentID", studentController.obtenerStudentPorId);
router.get("/student/name/:firstName", studentController.obtenerStudentPorName);

router.get(
  "/student/mother/:documentID",
  studentController.obtenerMotherStudentPorId
);

router.put("/student/:documentID", studentController.actualizarStudent);

router.delete("/student/:documentID", auth, studentController.eliminarStudent);

module.exports = router;

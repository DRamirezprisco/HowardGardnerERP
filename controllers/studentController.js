const Student = require("../models/Student");

//Crear estudiantes
exports.crearStudent = async (req, res) => {
  try {
    let dataStudent = new Student(req.body);
    await dataStudent.save();
    res.send(dataStudent);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error al crear al estudiante" });
  }
};

//Leer y obtener todos los estudiantes
exports.obtenerStudent = async (req, res) => {
  try {
    const dataStudents = await Student.find();
    res.json(dataStudents);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Erorr al obtener todos los estudiantes" });
  }
};

//obtener estudiante por el document id
exports.obtenerStudentPorId = async (req, res) => {
  try {
    const dataStudent = await Student.findOne({
      documentID: req.params.documentID,
    });
    if (!dataStudent) {
      res.status(404).send({ message: "Estudiante no encontrado" });
    }
    res.json(dataStudent);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "Error al obtener el estudiante" });
  }
};

//obtener estudiante por su nombre
exports.obtenerStudentPorName = async (req, res) => {
  try {
    const dataStudent = await Student.findOne({
      firstName: { $regex: new RegExp(req.params.firstName, "i") }, //regex=busqueda con expresión regular
    });
    if (!dataStudent) {
      res.status(404).send({ message: "Estudiante no encontrado" });
    }
    res.json(dataStudent);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "Error al obtener el estudiante" });
  }
};

//obtener madre del estudiante por su document id
exports.obtenerMotherStudentPorId = async (req, res) => {
  try {
    const dataStudent = await Student.findOne({
      "mother.documentID": req.params.documentID,
    });
    if (!dataStudent) {
      res.status(404).send({ message: "Madre del estudiante no encontrado" });
    }
    res.json(dataStudent);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "Error al obtener el estudiante" });
  }
};

//actualizar estudiante
exports.actualizarStudent = async (req, res) => {
  try {
    //destructurar
    const {
      firstName,
      lastName,
      dateOfBirth,
      age,
      nationality,
      blood,
      EPS,
      allergies,
      lives,
      enrollmentDate,
      active,
      mother,
      father,
      representative,
    } = req.body;

    //validaciones
    if (firstName.length === 0) {
      throw new Error("El nombre es requerido");
    }
    if (lastName.length === 0) {
      throw new Error("El apellido es requerido");
    }
    if (age <= 0) {
      throw new Error("la edad debe ser mayor a cero");
    }
    if (blood.length === 0) {
      throw new Error("El tipo de sangre es requerido");
    }
    if (mother != undefined) {
      const {
        firstNameMother,
        lastNameMother,
        phoneMother,
        emailMother,
        addressMother,
        dateOfBirthMother,
        ageMother,
      } = mother;
    }
    if (father != undefined) {
      const {
        firstNameFather,
        lastNameFather,
        phoneFather,
        emailFather,
        addressFather,
        dateOfBirthFather,
        ageFather,
      } = father;
    }
    if (representative != undefined) {
      const {
        firstNameRepresentative,
        lastNameRepresentative,
        phoneRepresentative,
        emailRepresentative,
        addressRepresentative,
        dateOfBirthRepresentative,
        ageRepresentative,
      } = representative;
    }

    //actualizar
    const updated = await Student.findOneAndUpdate(
      { documentID: req.params.documentID }, //filtro
      {
        firstName,
        lastName,
        dateOfBirth,
        age,
        nationality,
        blood,
        EPS,
        allergies,
        lives,
        enrollmentDate,
        active,
        mother,
        father,
        representative,
      }, //data a actualizar
      { new: true } //devuelve el documento actualizado
    );
    res.json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

//eliminar estudiante
exports.eliminarStudent = async (req, res) => {
  try {
    await Student.findOneAndDelete({ documentID: req.params.documentID });
    res.send({ message: "Estudiante eliminado exitosamente." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

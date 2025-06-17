const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  documentID: { type: Number, require: true },
  documentType: { type: String, require: true },
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  phone: { type: Number, require: true },
  email: { type: String, require: true },
  address: { type: String, require: false },
  dateOfBirth: { type: Date },
  age: { type: Number, require: true },
  nationality: { type: String, require: false },
});

const studentSchema = mongoose.Schema({
  documentID: { type: Number, require: true, index: true },
  documentType: { type: String, require: true },
  firstName: { type: String, require: true, lowercase: true },
  lastName: { type: String, require: true },
  dateOfBirth: { type: Date },
  age: { type: Number, require: true },
  nationality: { type: String, require: false },
  blood: { type: String, require: false },
  EPS: { type: String, require: false },
  allergies: { type: String, require: false, default: null },
  lives: { type: String, require: false },
  enrollmentDate: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },

  mother: { type: contactSchema, require: true },
  father: { type: contactSchema, require: true },
  representative: { type: contactSchema, require: true },
});

module.exports = mongoose.model("Student", studentSchema);

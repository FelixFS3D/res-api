const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  linkedinUrl: String,
  languages: {
    type: String,
    enum: ["English", "Dutch", "Portuguese", "French", "Spanish", "German"],
  },
  program: String,
  background: String,
  image: String,
  projects: [],
  cohort: {type: Schema.Types.ObjectId}
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");
const mongoose = require("mongoose");
const Student = require("./models/Student.model");
const Cohort = require("./models/Cohort.model");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/students", (req, res) => {
  Student.find()
  .populate("cohort")
    .then((students) => {
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).json({ error: "Failed to retrieve students"});
    });
});

app.get("/api/cohorts", (req, res) => {
  Cohort.find()
    .then((cohorts) => {
      res.json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      res.status(500).json({ error: "Failed to retrieve cohorts" });
    });
    

  
});

app.get("/api/cohorts/:cohortId", async (req, res, next)=>{
try {
  console.log(req.params.cohortId)
  const response = await Cohort.findById(req.params.cohortId)
  res.json(response)

} catch (error) {
  console.log(error)
  res.status(500).json({ error: "Failed to retrieve cohort" })
}
})

app.get("/api/students/:studentId", async (req,res,next)=>{
  try {
    const response = await Student.findById(req.params.studentId)
    .populate("cohort")
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to retrieve cohort" })
}
})

app.post("/api/students", async (req,res,next)=>{

  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    cohort,
    projects
  } = req.body

  try {
    const response = await Student.create({
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    cohort,
    projects
    })
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Error while creating a new student"})
  }
})

app.get("/api/students/cohort/:cohortId", async (req,res,next)=>{
  try {
    
    const response = await Student.find(req.query).select({ cohort: 1 })
    .populate("cohort")
    res.json(response)

  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Error while retrieve a student"})
  }
})

app.put("/api/students/:studentId", async (req,res,next)=>{
  try {

    const {
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      languages,
      program,
      background,
      image,
      cohort,
      projects
    } = req.body
    
    const response = await Student.findByIdAndUpdate(req.params.studentId, {
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      languages,
      program,
      background,
      image,
      cohort,
      projects
    },{new:true})
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Error while updating a single student"})
  }
})

app.delete("/api/students/:studentId", async (req,res,next)=>{

try {
  
  await Student.findByIdAndDelete(req.params.studentId)
  res.json("Student borrado")

} catch (error) {
  console.log(error)
  res.status(500).json({message: "Error while deleting a single student"})
}

})

app.post("/api/cohorts", async (req,res,next)=>{

  const {inProgress,
    cohortSlug,
    cohortName,
    program,
    campus,
    startDate,
    endDate,
    programManager,
    leadTeacher,
    totalHours} = req.body

try {
  
  const response = await Cohort.create({

    inProgress,
    cohortSlug,
    cohortName,
    program,
    campus,
    startDate,
    endDate,
    programManager,
    leadTeacher,
    totalHours

  },{new:true})
  res.json(response)
} catch (error) {
  console.log(error)
  res.status(500).json({message: "Error while creating a new cohort"})
}

})

app.put("/api/cohorts/:cohortId", async (req,res,next)=>{

  const {inProgress,
    cohortSlug,
    cohortName,
    program,
    campus,
    startDate,
    endDate,
    programManager,
    leadTeacher,
    totalHours} = req.body

try {
  
  const response = await Cohort.findByIdAndUpdate(req.params.cohortId, {

    inProgress,
    cohortSlug,
    cohortName,
    program,
    campus,
    startDate,
    endDate,
    programManager,
    leadTeacher,
    totalHours

  },{new:true})
  res.json(response)
} catch (error) {
  console.log(error)
  res.status(500).json({message: "Error while updating a single cohort"})
}

})

app.delete("/api/cohorts/:cohortId", async (req,res,next)=>{

  try {
    await Cohort.findByIdAndDelete(req.params.cohortId)
    res.json("Cohort Borrado")


  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Error while deleting a single cohort"})
  }

})

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

mongoose
  .connect("mongodb://127.0.0.1:27017/cohorts-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

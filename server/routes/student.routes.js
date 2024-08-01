const express = require("express");
const router = express.Router();

const Student = require("./models/Student.model");

router.get("/", async (req, res, next) => {
  try {
    const response = await Student.find().populate("cohort", "cohortName");
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/:studentId", async (req, res, next) => {
  try {
    const response = await Student.findById(req.params.studentId).populate(
      "cohort", "cohortName"
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
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
      projects,
    } = req.body;
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
      projects,
    });
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/cohort/:cohortId", async (req, res, next) => {
  try {
    const response = await Student.find({cohort: req.params.cohortId})
      
      .populate("cohort", "cohortName");
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.put("/:studentId", async (req, res, next) => {
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
      projects,
    } = req.body;

    const response = await Student.findByIdAndUpdate(
      req.params.studentId,
      {
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
        projects,
      },
      { new: true }
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.delete("/:studentId", async (req, res, next) => {
  try {
    await Student.findByIdAndDelete(req.params.studentId);
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
});

module.exports = router

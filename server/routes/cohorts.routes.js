const express = require("express");
const router = express.Router();

const Cohort = require("../models/Cohort.model");

router.get("/", async (req, res, next) => {
 
 try {
  const cohorts = await Cohort.find()
  res.status(200).json(cohorts);
 } catch (error) {
  next(error)
 }
      
    });


router.get("/:cohortId", async (req, res, next) => {
  try {
   
    const response = await Cohort.findById(req.params.cohortId);
    res.status(200).json(response);
  } catch (error) {
    next(error)
  }
});
router.post("/", async (req, res, next) => {
    
    try {
      const {
        inProgress,
        cohortSlug,
        cohortName,
        program,
        campus,
        startDate,
        endDate,
        programManager,
        leadTeacher,
        totalHours,
      } = req.body;
    const response = await Cohort.create(
      {
        inProgress,
        cohortSlug,
        cohortName,
        program,
        campus,
        startDate,
        endDate,
        programManager,
        leadTeacher,
        totalHours,
      },
      { new: true }
    );
    res.status(201).json(response);
  } catch (error) {
    next(error)
  }
});

router.put("/:cohortId", async (req,res,next)=>{

    
    try {
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
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
  
  })
  
  router.delete("/:cohortId", async (req,res,next)=>{
  
    try {
      await Cohort.findByIdAndDelete(req.params.cohortId)
      res.sendStatus(202)
  
    } catch (error) {
    next(error)
    }
  
  })

  module.exports = router

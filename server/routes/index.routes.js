const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "Todo va bien" });
});



const studentRouter = require("./student.routes.js");
router.use("/students", studentRouter);

const cohortRouter = require("./cohorts.routes.js");
router.use("/cohorts", cohortRouter);

const authRouter = require("./auth.routes.js")
router.use("/auth", authRouter);

const userRouter = require("./users.routes.js")
router.use("/users", userRouter);

module.exports = router;

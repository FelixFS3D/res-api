const router = require("express").Router();
const User = require("../models/User.model");

const tokenValidation = require("../middlewares/auth.middlewares");

router.get("/:id", tokenValidation, async (req, res, next) => {


console.log(req.params.id)

    try {
        const response = await User.findById(req.params.id)
        res.status(200).json(response)

        
    } catch (error) {
       next(error) 
    }
})



module.exports= router;
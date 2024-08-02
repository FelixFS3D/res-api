const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

const User = require("../models/User.model");

const router = require("express").Router();

const tokenValidation = require("../middlewares/auth.middlewares");


//POST "/api/auth/signup" => crear el documento de usuario


router.post("/signup", async (req, res, next) => {
    console.log(req.body);
    const {email, password, name} = req.body
    
if(!email || !password){
    res.status(400).json({errorMessage: "email y password son campos obligatorios"})
    return;
}

try {

    const foundUser = await User.findOne( { email: email } )
    if (foundUser !== null) {
     
      res.status(400).json({errorMessage: "Usuario ya registrado con ese correo electronico"})
      return 
    }

    const salt = await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash(password, salt)
    
    await User.create({
      email,
      name,
      password: hashPassword
    })

    res.sendStatus(201)

  } catch (error) {
    next(error)
  }

})

//POST "/api/auth/login" => para loggearse

router.post("/login", async (req, res, next) => {

    const {email, password} = req.body

    if(!email || !password){
        res.status(400).json({errorMessage: "email y password son campos obligatorios"})
        return;  
    }
    
    try {

    const foundUser = await User.findOne({email: email})
    console.log(foundUser)

    if(foundUser === null){
        res.status(400).json({errorMessage: "usuario no registrado"})
        return
    }

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
    if(isPasswordCorrect === false){
        res.status(400).json({errorMessage: "contraseña incorrecta"})
        return
    }

    const payload = {
        _id: foundUser._id,
        email: foundUser.email
    }

    const authToken = jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        {algorithm: "HS256", expiresIn: "2d"}
    )

    res.status(200).json({authToken})
        
    } catch (error) {
        next(error)
    }

})

//GET "/api/auth/verify" => validar token

router.get("/verify", tokenValidation, (req, res, next) =>{
    console.log(req.payload)
    res.status(200).json(req.payload)
})





module.exports = router
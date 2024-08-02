const jwt = require('jsonwebtoken');

function tokenValidation ( req, res, next){
try {
    const tokenArr =  req.headers.authorization.split(" ")
    //console.log(tokenArr)
    const token = tokenArr[1]

    const payload = jwt.verify(token, process.env.TOKEN_SECRET)
    console.log(payload)


    req.payload = payload

    next()
} catch (error) {
    res.status(401).json({errorMessage: "Token no existe o no es valido"})
}
}

module.exports = tokenValidation
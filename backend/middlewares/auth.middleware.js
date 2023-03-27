const jwt = require("jsonwebtoken")

const auth = async (req, res, next)=>{
    try {
        let token = req.headers.authorization.split(" ")[1] || req.headers.authorization.split(" ")[0]
        jwt.verify(token, "shhhhh", async function(err, decoded){
            if(decoded){
                req.body.userID = decoded.userID;
                next()
            }else{
                res.send({"msg": "wrong token"})
            }
        })
    } catch (error) {
        res.send({"msg": "wrong token"})
    }
}

module.exports = {auth}
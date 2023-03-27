const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { UserModel } = require("../model/user.model");
const { checkDuplicate } = require("../middlewares/duplicate.middleware");

const userRouter = express.Router();

userRouter.post("/register", checkDuplicate,  async (req, res)=>{
    let {password} = req.body;
    try {
        bcrypt.hash(password, 5, async function(err, hash) {
            // Store hash in your password DB.
            if(hash){
                req.body.password = hash
                let payload = new UserModel(req.body);
                await payload.save();
                res.status(200).json({"msg":"registered successfully"})
            }else{
                res.json({"msg": err.message})
            }
        });
    } catch (error) {
        res.json({"msg": "something wrong"})
    }
})

userRouter.post("/login", async (req, res)=>{
    let {email, password} = req.body;
    let obj = await UserModel.findOne({email});
    console.log(obj)
    try {
        bcrypt.compare(password, obj.password, function(err, result) {
            // result == true
            if(result){
                res.send({"msg": "login success", token: jwt.sign({ userID: obj._id }, 'shhhhh')})
            }else{
                res.json({"msg":"wrong password"})
            }
        });
    } catch (error) {
        res.json({"msg": "something wrong"})
    }
})

module.exports = {userRouter}
const express = require("express");
const {PostModel} = require("../model/post.model");
const { UserModel } = require("../model/user.model");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken")
// const { UserModel } = require("../model/user.model");
// const { checkDuplicate } = require("../middlewares/duplicate.middleware");

const postRouter = express.Router();

postRouter.get("/",  async (req, res)=>{
    try {
        let data = await PostModel.find({userID: req.body.userID});
        res.send(data)
    } catch (error) {
        res.json({"msg": "something wrong"})
    }
})

postRouter.post("/add",  async (req, res)=>{
    try {
        let payload = new PostModel(req.body);
        await payload.save();
        res.json({"msg": "addedd successfully"})
    } catch (error) {
        res.json({"msg": "something wrong"})
    }
})

postRouter.delete("/delete/:id", async (req, res)=>{
    const {id} = req.params
    try {
        await PostModel.findByIdAndDelete({userID: req.body.userID, _id: id})
        res.send({"msg":"deleted successfully"})
    } catch (error) {
        res.send(error)
    }
})

postRouter.patch("/update/:id", async (req, res)=>{
    const {id} = req.params
    console.log(req.body)
    try {
        let data = await PostModel.findByIdAndUpdate({userID: req.body.userID, _id: id}, req.body)
        res.send({"msg":"updated successfully"})
    } catch (error) {
        res.send(error)
    }
})



module.exports = {postRouter}
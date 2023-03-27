const express = require("express");
const { connection } = require("./db");
const cors = require("cors")
const { userRouter } = require("./routes/user.route");
const {postRouter} = require("./routes/post.route");
const { auth } = require("./middlewares/auth.middleware");

require("dotenv").config();


const app = express();

app.get("/", (req, res)=>{
    res.json({"msg":"hello world"})
})

app.use(express.json());

app.use(cors())

app.use("/users", userRouter)
app.use(auth)
app.use("/posts", postRouter)

app.listen(process.env.port, async ()=>{
    try {
        connection
        console.log("connection established")
        console.log(`port is ${process.env.port}`)
    } catch (error) {
        console.log(error)
    }
})


const { UserModel } = require("../model/user.model")


const checkDuplicate = async (req, res, next) => {
    let {email, name, age, city, password, is_married, gender} = req.body;
    try {
        let data = await UserModel.find({email, name});
        console.log(data)
        if (data.length > 0) {
            res.json({ "msg": "User already exist, please login" })
        } else {
            next()
        }
    } catch (error) {
        res.send({ "msg": error })
    }

}

module.exports = { checkDuplicate }
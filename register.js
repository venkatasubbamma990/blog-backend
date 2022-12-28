let express=require("express")
let bodyParser = require('body-parser')
let User =require("./user-model")
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let register = express()
let cors = require("cors");
register.use(cors({
    origin: "*",
}))

register.use(express.json())
register.use(bodyParser.json())
register.use(bodyParser.urlencoded())
register.post('/register', async (req, res) => {
    try {
        console.log("its coming")
        console.log(req.body)
        const { email, password, confirmpassword } = req.body;
        
        let userData = await User.findOne({ email :email });
        if (userData) {
            return res.status(409).json({
                status: "Failed",
                message: "User already exists with the given email"
            })
        }
        console.log(password,confirmpassword)
        if (password !== confirmpassword) {
            return res.status(400).send('Passwords are not matching');
        }

        bcrypt.hash(password, 10, async function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                return res.status(500).json({
                    status: "Failed",
                    message: err.message
                })
            }
            userData = await Login.create({
                email: email,
                password: hash
            });
            res.json({
                status: "ok",
               
                
            })
        })
    }
    catch (e) {
        res.json({
            status: "Failed",
            message: e.message
        })
    }
});
module.exports = register
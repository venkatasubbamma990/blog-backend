const express=require("express")
let user = express()
let bodyParser = require('body-parser')
const User =require("./user-model")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const cors = require("cors")
user.use(cors({
    origin: "*",
}))
user.use(express.json())
user.use(bodyParser.json())
user.use(bodyParser.urlencoded())
route.post('/register', async (req, res) => {
    try {
        console.log("its coming")
        console.log(req.body)
        const { email, password, confirmpassword } = req.body;
        
        let userData = await Login.findOne({ email :email });
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
user.post("/login", async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    const userData = await User.findOne({email:email});
    
    console.log(userData)
    if (userData) {
        // is await requred for bcrypt???
        let result = await bcrypt.compare(password, userData.password);
        if (result) {
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
                data: userData.email,
            },
                process.env.SECRET
            );
            res.status(200).json({
                Status: "ok",
                token: token,
            });
        } else {
            res.status(400).json({
                status: "failed",
                message: "Wrong Password",
            });
        }
    }
    else {
        res.status(400).json({
            status: "failed",
            message: "No user Found pls register ",
        });
    }
});


module.exports= user;

 
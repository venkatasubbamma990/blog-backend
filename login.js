const express = require("express")
const User =require("./user-model")
const bcrypt = require('bcrypt');
const user = express()
user.use(express.json())
const cors = require("cors")
user.use(cors({
    origin: "*",
}))
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
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
module.exports = user

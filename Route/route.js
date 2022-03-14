const router = require("express").Router()
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const mongodb = require("mongodb")
const bp = require("body-parser")
const model = require("../Model/user")

const path = require("path")
const { response } = require("express")
mongoose.connect("mongodb://localhost:27017/signup", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log('DB connected'))

router.get('/login', (req, res) => {
    res.send('test route')
})

router.post('/signup', [
    check("email", "Please Input A Valid Email").isEmail(),
    check("password", "Your Provided Password Must Have Equal Or More Than 8 Characters").isLength({
        min: 8
    })
], async (req, res) => {
    try {
        const { email, name, password, age, dob, phone } = req.body
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        // if(password != conPass){
        //     return res.status(205).json({
        //         "message": "your password must match with the confirm password"
        //     })
        // }

        // const hashpass = await bcrypt.hash(password, 10)
        const user = await model.create({
            name,
            email,
            password, //:hashpass,
            age,
            dob,
            phone,
        })
        res.statusCode = 201
        res.send({ user })
        console.log("user created successfuly:", user)
    } catch (e) {
        console.log(e)
        return res.json({ status: 'error' })
    }

    // const token = await jwt.sign({
    //     email, password,
    // }, "aoiehohlaklmnijsbaoeojfcmcooapwqehgsanxcyg", {
    //     expiresIn: 3600000
    // })
    // res.json({
    //     token
    // })
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)

    let userData = await model.findOne({
        email
    })

    console.log(userData, "====")

    if (!userData) {
        return res.json({
            "data": {},
            "message": "not found",
            "status": false
        })
    } else {
        console.log("userData.password", userData, userData.password)
        if (userData.password != password) {
            return res.status(400).json({
                error: [{
                    "message": "1234Invalid Credentials"
                }]
            })
        } else {
            console.log("Login successful")
            return res.json({
                "data": userData,
                "message": "Data Found",
                "status": true
            })
        }
    }

    // const hashpass = await bcrypt.hash(password, 10)
    // let isMatch = await bcrypt.compare(hashpass, userData.password)

    // const token = await jwt.sign({
    //     email, password,
    // }, "aoiehohlaklmnijsbaoeojfcmcooapwqehgsanxcyg", {
    //     expiresIn: 3600000
    // })
    // res.json({
    //     token
    // })
})

router.get('/all', async (req, res) => {
    const users = await model.find()
    res.json(users)
})

module.exports = router
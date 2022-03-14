const express = require("express")
const Port = 5000
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())
const auth = require("./Route/route")
// const posts = require("./Route/posts")

app.use("/auth",auth)
//app.use("posts",posts)

app.get('/',(req, res) => {
    res.send(`Hello There! You're on Port: ${Port}`)
})

app.listen(Port, () => {
    console.log(`You're Currently On Port: ${Port}`)
})

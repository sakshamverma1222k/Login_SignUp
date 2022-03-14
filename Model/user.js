const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true,
    },
    password: {
        type:String,
        required:true
    },
    age:Number,
    Dob:Date,
    phone:Number
},{
    collection: 'user'
})

const model = mongoose.model('user',userSchema)

module.exports = model
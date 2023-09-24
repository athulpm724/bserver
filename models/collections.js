//create model

//import mongoose

const mongoose=require('mongoose')

//define schema-fields and values

const usersSchema=mongoose.Schema({
    acno:Number,
    psw:String,
    uname:String,
    balance:Number,
    transactions:[]
    
})

//model - collection name

const users=new mongoose.model("users",usersSchema)


//export model - to import in another files

module.exports = users


//import env file

require('dotenv').config()


const express=require('express')

const router = require('./routes/router')

const cors=require('cors')

const server=express()

//integrate cors
server.use(cors())

const port=2500|| process.env.port
server.use(express.json())


// import connection.js file

require('./db/connection')

//router set

server.use(router)


server.listen(port,()=>{
    console.log('WORKING!!!');
})

const express=require('express')

const { register, login ,getBalance , moneyTransfer , accountStatement} = require('../controllers/logic')  
const { jwtMiddleware } = require('../middlewares/jwtMiddleware')



//router object

const router=new express.Router()

//create ac-signup

router.post('/bankuser/create_account',register)

//login

router.post('/bankuser/login',login)

//check balance

router.get('/bankuser/balance/:acno',getBalance,jwtMiddleware)

// money transfer

router.post('/bankuser/money-transfer',moneyTransfer,jwtMiddleware)

// history route

router.get('/bankuser/acc-statement/:acno',accountStatement,jwtMiddleware)


//router export

module.exports=router


const users = require('../models/collections')

const jwt=require('jsonwebtoken')


// registration-account creation

register=(req,res)=>{

    //destructuring
    const { acno , psw , uname } = req.body

    //check user data in collections

    users.findOne({acno}).then(user=>{
        if(user){

            //  only sends data
            // res.send({
            //     message:"user already exists!",
            //     status:false,
            //     statuscode:400
            // })

            // converts data to json and sends
            //status is used to edit status code
            res.status(400).json({
                message:"user already exists!",
                status:false,
                statuscode:400
            })
        }
        else{
            
            //create object for user
            let newUser=new users({
                acno,
                uname,
                psw,
                balance:0,
                transactions:[]
            })

            newUser.save();
            res.status(201).json({
                message:"account created successfully!",
                status:true,
                statuscode:201
            })
        }
        
    })


}

login = (req,res)=>{
    // accessing data from body

    const{acno,psw}=req.body

    users.findOne({acno,psw}).then(user=>{
        if(user){
            
            //token generation
            const token=jwt.sign({acno},"secretkey123")
    
            res.status(200).json({
                message:"login successful",
                status:true,
                statuscode:200,
                CurrentUser:user.uname,
                token
            })
        }
        else{
            
            res.status(404).json({
                message:"incorrect credentials",
                status:false,
                statuscode:404
            })
        }
    })
}

getBalance=(req,res)=>{

    //access acno from param
    const {acno} =req.params 
    users.findOne({acno}).then(user=>{
        if(user){
            res.status(200).json({
                message:user.balance,
                status:true,
                statuscode:200
            })
        }
        else{
            
            res.status(404).json({
                message:"user not found",
                status:false,
                statuscode:404
            })
        }
    })
}

moneyTransfer=(req,res)=>{
    const {sAcno,rAcno,amount,psw,date}=req.body

    var amnt=parseInt(amount)


    //check sender details
    users.findOne({acno:sAcno,psw}).then(suser=>{
        if(suser){
            users.findOne({acno:rAcno}).then(ruser=>{
                if(ruser){
                    if(amount<=suser.balance){
                        suser.balance=suser.balance-amnt
                        suser.transactions.push({tacno:rAcno,amount:amnt,type:"DEBIT",date})
                        suser.save()

                        ruser.balance+=amnt
                        ruser.transactions.push({tacno:sAcno,amount:amnt,type:"CREDIT",date})
                        ruser.save()

                        res.status(200).json({
                            message:"successful!!",
                            status:true,
                            statuscode:200
                        })


                    }
                    else{   
                        res.status(404).json({
                            message:amnt,
                            status:false,
                            statuscode:404
                        })
                    }
                }
                else{
                    res.status(404).json({
                        message:"invalid credit credentials",
                        status:false,
                        statuscode:404
                    })
                }
            })
        }
        else{
            res.status(404).json({
                message:"invalid debit credentials",
                status:false,
                statuscode:404
        })
    }
    })
}

// account statement

accountStatement=(req,res)=>{
    const {acno}=req.params
    users.findOne({acno}).then(user=>{
        if(user){
            res.status(200).json({
                message:user.transactions,
                status:true,
                statuscode:200
            })
        }
        else{
            
            res.status(404).json({
                message:"user not found",
                status:false,
                statuscode:404
            })   
        }  
   
    })
}


module.exports={register,login,getBalance,moneyTransfer,accountStatement}


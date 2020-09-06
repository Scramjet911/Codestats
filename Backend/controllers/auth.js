const User= require("../models/user");
const { check ,validationResult} = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
const nodemailer = require("nodemailer");

exports.signup = (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    const user=new User(req.body)
    //creating a token
    const token =jwt.sign({_id:user._id},process.env.EMAIL_SECRET,{expiresIn:'1d'});
    //user.token=token;
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err:"Not able to save user in DB"
            })
        }
        const url=`http://localhost:3000/confirmation/${token}`;
        
        //send mail
        try{
        var transporter = nodemailer.createTransport({ 
            service: 'gmail',
             auth: {
                  user: process.env.MAIL_ID,
                  pass: process.env.MAIL_PASS 
                }
            
             });
        var mailOptions = {
             from: 'codestat',
             to: user.email,
             subject: 'Account Verification Token',
             text: `Hello,\n\n' + 'Please verify your account by clicking the link:${url} ` 
            };
        transporter.sendMail(mailOptions,(err,data)=> {
            if (err) 
                { 
                    return res.status(500).send({ msg: err.message });
                }
            res.status(200).send('A verification email has been sent to ' + user.email + '.');
        });
    }catch(e){
        console.log(e);
    }
        
        // res.json({
        //     username:user.username,
        //     name:user.name,
        //     email:user.email,
        //     id:user._id
        // });
    })

};
//email verification
exports.confirmationPost=(req,res)=>{
    try {
        
        token=req.params.token;
        jwt.verify(token, process.env.EMAIL_SECRET,(err, decoded) =>{
            if(err){
                return res.status(400).json({
                    err:"Not able verify your mail"
                })

              }
              var userId=decoded._id
            //   console.log(token)
            //   console.log(userId)
              User.findByIdAndUpdate({_id:userId},{confirmed:true},(err,user)=>{
                if(err || !user){
                    return res.status(400).json({
                        error:"user  doesnot exist"
                    })
                }
               
                if(user.confirmed){
                    return res.status(401).json({
                        error:"user already confirmed."
                    })
        
                }
                
                return res.status(400).json({
                    message:"email confirmed"
                })
        
            });
          })
      } catch (e) {
        //   console.log(e)
        res.send(e);
        
      }
    
     
}

exports.signin = (req,res)=>{
    
    const errors = validationResult(req)
    const { email,password }=req.body;
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        });
    }
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"user email doesnot exist"
            })
        }
       
        if(!user.authenticate(password)){
            return res.status(401).json({
                error:"email &password do not match"
            })

        }
        if(!user.confirmed){
            return res.status(400).json({
                error:"Please confirm your email.."
            }) 
        }
        //creating a token
        const token =jwt.sign({_id:user._id},process.env.SECRET);
        //put token into cookies
        res.cookie("token",token,{ expire:new Date()+9999});

        // send response to the front end
        const {_id,username,name,email,role}=user;
        return res.json({token,user:{ _id,username,name,email,role} });

    });
};
exports.forgotpassword=(req,res)=>{
    const errors = validationResult(req)
    const { email }=req.body;
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        });
    }
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"user email doesnot exist"
            })
        }
       
        //creating a token
        const token =jwt.sign({_id:user._id},process.env.FORGET_SECRET);
        user.temp_token=token;
        user.save((err,user)=>{
            if(err){
                return res.status(400).json({
                    error:"token creation failed"
                })
            }

            const url=`http://localhost:3000/createpassword/${token}`;
        
        //send mail
        try{
        var transporter = nodemailer.createTransport({ 
            service: 'gmail',
             auth: {
                  user: process.env.MAIL_ID,
                  pass: process.env.MAIL_PASS 
                }
            
             });
        var mailOptions = {
             from: 'codestat',
             to: user.email,
             subject: 'Create new password',
             text: `Hello,\n\n' + 'to create new password please click:${url} ` 
            };
        transporter.sendMail(mailOptions,(err,data)=> {
            if (err) 
                { 
                    return res.status(500).send({ msg: err.message });
                }
            res.status(200).send('A change password link is send to ' + user.email + '.');
        });
    }catch(e){
        console.log(e);
    }

        })


    });

}
exports.createPassword = (req,res)=>{
        
    try {
        
        token=req.params.token;
        password=req.body.password;
        jwt.verify(token, process.env.FORGET_SECRET,(err, decoded) =>{
            if(err){
                return res.status(400).json({
                    err:"Not able change your password"
                })

              }
              var userId=decoded._id
            //   console.log(token)
            //   console.log(userId)
              User.findByIdAndUpdate({_id:userId},{password:password},(err,user)=>{
                if(err || !user){
                    return res.status(400).json({
                        error:"user  doesnot exist"
                    })
                }
                
                return res.status(400).json({
                    message:"password changed successfully..."
                })
        
            });
          })
      } catch (e) {
        //   console.log(e)
        res.send(e);
        
      }
}

exports.signout= (req,res)=>{
    res.clearCookie("token")
    res.json({
        message:"user signout successfully"
        });
        
};

//protected routes
exports.isSignedIn=expressJwt({
    secret:process.env.SECRET,
    algorithms: ['HS256'],
    userProperty:"auth"
})

//custom middlewares
exports.isAuthenticated=(req,res,next)=>{
    let checker = req.profile && req.auth && req.profile._id== req.auth._id;
    if(!checker){
        return res.status(403).json({
            error:"ACCESS DENIED"
        });
    }
    next();
}

exports.isAdmin=(req,res,next)=>{
    if(req.profile.role===0){
        return res.status(403).json({
            error:"You are not  ADMIN, Access denied"
        });
    }
    next();
}

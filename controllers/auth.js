const User= require("../models/user");
const {validationResult} = require('express-validator');
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
    // Creating a token
    const token =jwt.sign({_id:user._id},process.env.EMAIL_SECRET,{expiresIn:'1d'});
    let verifyLink = (process.env.NODE_ENV==='production')?`https://codestats-test.herokuapp.com/api/confirmation/${token}`:`http://localhost:8000/api/confirmation/${token}`;
    let mailBody = `
        <div style="font-size:16px;background-color:#fdfdfd;margin:0;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;line-height:1.5;height:100%!important;width:100%!important">
            <div>
                <h1 style="font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size: 25px;color:#294661">
                    Codestats
                </h1>
            </div>
            <table style="box-sizing:border-box;border-spacing:0;width:100%;background-color:#fdfdfd;border-collapse:separate!important" width="100%" bgcolor="#fdfdfd">
                <tbody>
                    <tr>
                        <td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;display:block;width:600px;max-width:600px;margin:0 auto!important" width="600" valign="top">
                            <div style="box-sizing:border-box;display:block;max-width:600px;margin:0 auto;padding:10px">
                                <span style="color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;width:0">Let's confirm your email address.</span>
                                <div style="box-sizing:border-box;width:100%;margin-bottom:30px;margin-top:15px">
                                    <table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%">
                                        <tbody>
                                            <tr>
                                                <td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;text-align:left" valign="top" align="left"><span><a href=""></a></span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div style="box-sizing:border-box;width:100%;margin-bottom:30px;background:#ffffff;border:1px solid #f0f0f0">
                                    <table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%">
                                        <tbody>
                                            <tr>
                                                <td style="box-sizing:border-box;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;padding:30px" valign="top">
                                                    <table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top">
                                                                    <h2 style="margin:0;margin-bottom:30px;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-weight:300;line-height:1.5;font-size:24px;color:#294661!important">You're on your way!<br>
                                                                        Let's confirm your email address.
                                                                    </h2>
                                                                    <p style="margin:0;margin-bottom:30px;color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300">By clicking on the following link, you are confirming your email address.</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top">
                                                                    <table style="box-sizing:border-box;border-spacing:0;width:100%;border-collapse:separate!important" width="100%" cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;padding-bottom:15px" valign="top" align="center">
                                                                                    <table style="box-sizing:border-box;border-spacing:0;width:auto;border-collapse:separate!important" cellspacing="0" cellpadding="0">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;background-color:#348eda;border-radius:2px;text-align:center" valign="top" bgcolor="#348eda" align="center"><a href=${verifyLink} target="_blank" style="box-sizing:border-box;border-color:#348eda;font-weight:400;text-decoration:none;display:inline-block;margin:0;color:#ffffff;background-color:#348eda;border:solid 1px #348eda;border-radius:2px;font-size:14px;padding:12px 45px">Confirm Email Address</a></td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        `;

    //user.token=token;
    user.save((err,user)=>{
        if(err){
            return res.status(400).send("Not able to save user in DB");
        }

        //send mail
        try{
            let transporter = nodemailer.createTransport({ 
                host:'smtp.gmail.com',
                port:'465',
                secure: true,
                auth: {
                    type: 'OAuth2',
                    user: process.env.GMAIL_USER,
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    refreshToken: process.env.REFRESH_TOKEN,
                    accessToken: process.env.ACCESS_TOKEN
                }
            });
            let mailOptions = {
                from: 'Codestats <codestats.web@gmail.com>',
                to: user.email,
                subject: 'Verify Account',
                generateTextFromHtml:true,
                html:mailBody
                };
            transporter.sendMail(mailOptions,(err,info)=> {
                if (err){ 
                        return res.status(500).send(err.message);
                }
                else{
                    console.log(info.messageId,'\n',info.accepted);
                    res.status(200).send('A verification email has been sent to ' + user.email + '.');
                }
                transporter.close();
            });
        }
        catch(e){
            console.log(e);
        }
    });
};

// Email verification
exports.confirmationPost=(req,res)=>{
    try {
        token=req.params.token;
        jwt.verify(token, process.env.EMAIL_SECRET,(err, decoded) =>{
            if(err){
                console.log(err,decoded);
                return res.status(400).send("Not able verify your mail");
            }
            var userId=decoded._id
            //   console.log(token)
            //   console.log(userId)
            User.findByIdAndUpdate({_id:userId},{confirmed:true},(err,user)=>{
                if(err || !user){
                    return res.status(400).send("Invalid Token");
                }
                
                if(user.confirmed){
                    return res.status(401).send("Invalid Token");
                }
                
                return res.status(200).send("Email Confirmed");
            });
        });
    } 
    catch(e){
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
                error:"Incorrect Email/Password"
            });
        }
       
        if(!user.authenticate(password)){
            return res.status(401).json({
                error:"Incorrect Email/Password"
            });
        }

        if(!user.confirmed){
            return res.status(400).json({
                error:"Please confirm your Email.."
            }); 
        }
        // Creating a token
        const token =jwt.sign({_id:user._id},process.env.SECRET);
        // Put token into cookies
        res.cookie("token",token,{ expire:new Date()+9999});

        // Send response to the front end
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
        if(err){
            return res.status(400).json({
                error:"Couldn't Send Email"
            });
        }
        if(!user){
            return res.status(200).send("A change password link has been Sent to the Email.");
        }
       
        // Creating a token
        const token =jwt.sign({_id:user._id},process.env.FORGET_SECRET);
        user.temp_token=token;
        user.save((err,user)=>{
            if(err){
                return res.status(400).json({
                    error:"Token creation failed"
                })
            }
            const url=(process.env.NODE_ENV==='production')?`https://codestats-test.herokuapp.com/createpassword/${token}`:`http://localhost:8000/createpassword/${token}`;
        // Send Forgot Password mail
            try{
                let transporter = nodemailer.createTransport({ 
                    host:'smtp.gmail.com',
                    port:'465',
                    secure: true,
                    auth: {
                        type: 'OAuth2',
                        user: process.env.GMAIL_USER,
                        clientId: process.env.CLIENT_ID,
                        clientSecret: process.env.CLIENT_SECRET,
                        refreshToken: process.env.REFRESH_TOKEN,
                        accessToken: process.env.ACCESS_TOKEN
                    }
                });
                let mailOptions = {
                    from: 'Codestats <codestats.web@gmail.com',
                    to: user.email,
                    subject: 'Create new password',
                    text: `Hello,\n\n' + 'to create new password please click:${url} ` 
                    };
                transporter.sendMail(mailOptions,(err,data)=> {
                    if (err) 
                        { 
                            return res.status(500).send({ msg: err.message });
                        }
                    res.status(200).send('A change password link has been Sent to the Email.');
                    transporter.close();
                });
            }
            catch(e){
                console.log(e);
            }
        });
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
                });
              }
              var userId=decoded._id
            //   console.log(token)
            //   console.log(userId)
              User.findByIdAndUpdate({_id:userId},{password:password},(err,user)=>{
                if(err || !user){
                    return res.status(400).json({
                        error:"User Does not Exist"
                    });
                }
                
                return res.status(400).json({
                    message:"Password changed successfully..."
                });
        
            });
        });
    }
    catch (e) {
        //   console.log(e)
        res.send(e);
    }
}

exports.signout= (req,res)=>{
    res.clearCookie("token")
    res.json({
        message:"User Signout success"
    });
};

// Protected routes
exports.isSignedIn=expressJwt({
    secret:process.env.SECRET,
    algorithms: ['HS256'],
    userProperty:"auth"
})

// Custom middlewares
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
            error:"ACCESS DENIED"
        });
    }
    next();
}


//https://localhost:8000/confirmation/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjVjYWM0ZjVjOWZkODBjYjg0MDlmYTAiLCJpYXQiOjE1OTk5MDg5NDMsImV4cCI6MTU5OTkxMjU0M30.uvGAE8nAijSwxkESd1P--sHsod1-eIqTT0LgY3FUKX8
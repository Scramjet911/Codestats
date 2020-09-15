require('dotenv').config();
const mongoose = require('mongoose');

exports.getNotification = async (req,res)=>{
    try{
        let jobs = await req.app.agenda.jobs({'data.userId':req.params.userId,'data.eventId':req.params.eventId});
        let jobdata = jobs.map(job=>{
            let obj = {};
            obj.notifTime = job.attrs.data.date;
            obj.notifId = job.attrs._id;
            return obj;
        });
        // console.log("Got Notifications",jobdata);
        res.status(201).json(jobdata);
    }
    catch(e){
        console.log("Server Error",e);
    }
}

/* Request should be like :
{
    eventId,
    date : (Date of Notification, send JSON.stringify(date) from client),
} */
exports.queueNotification = (req, res, next)=>{
    let notifBody = req.body;
    let notifTime = new Date(notifBody.date);

    notifBody.userId = req.params.userId;
    if(notifTime >= Date.now())
        req.app.agenda.schedule(notifTime,'sendNotification',notifBody);
    next();
}

/* Req : 
{
    eventId,
    oldDate : ...(Date of Notification, send JSON.stringify(date) from client),
    newDate : ...
} */ 
exports.updateNotification = (req, res)=>{
    let notifBody = req.body;
    notifBody.userId = req.params.userId;
    req.app.agenda.cancel({_id:mongoose.Types.ObjectId(req.body.notifId)},(err)=>{
        if(err) 
            return res.status(500).send(err);
        res.status(201).send("Success");
    });
    let notifTime = notifBody.date;
    delete notifBody.oldDate;
    delete notifBody.newDate;
    if(new Date(notifTime) >= Date.now()){
        req.app.agenda.schedule(notifTime,'sendNotification',notifBody);
        res.status(201).send("Notification Added");
    }
    else{
        res.status(422).send("Invalid Time");
    }
}

/* Needs EventId in body */
exports.deleteNotification = (req, res, next)=>{
    req.app.agenda.cancel({'data.userId':req.params.userId,'data.eventId':req.body.eventId},(err)=>{
        if(err){
            console.log("Server Error",err);
        }
    });
    next();
}
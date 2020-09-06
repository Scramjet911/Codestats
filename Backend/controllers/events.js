const {Events, EventsReview} = require('../models/events');
const moment = require('moment');                                               // JS date Drives me crazy, using momentjs

/* Getting Monthly Events For Calender */
exports.getEvent = (req, res)=>{
    let currdate = moment();
    let queryDateMin = moment([currdate.year(),currdate.month(), 1]),
        queryDateMax = moment(queryDateMin).endOf('month');

    if(req.query.page && parseInt(req.query.page)>1){                           // To get different Month Events
        queryDateMin.add(parseInt(req.query.page)-1,'month');
        queryDateMax = moment(queryDateMin).endOf('month');
    }

    Events.find({"date" : {$gte : queryDateMin, $lte : queryDateMax}},(err,events)=>{
        if(err){
            console.log("Database Error",err);
            res.status(500).send("Error");
        }
        else{
            res.status(201).json(events);
        }
    })
}

/* Getting Events Submitted By particular user */
exports.getReviewEvent = (req, res)=>{
    EventsReview.find({userId : req.params.userId},(err,events)=>{
        if(err){
            console.log("Database Error",err);
            res.status(500).send("Error");
        }
        else{
            res.status(201).json(events);
        }
    });
}

/* Adding Events For Review By admin */
exports.addReviewEvent = (req, res)=>{
    var saveObj = req.body;
    saveObj.date = new Date(saveObj.date);
    saveObj.userId = req.params.userId;
    EventsReview.create(saveObj,(error,newEvent)=>{
        if(error && error.name == 'ValidationError'){
            console.log('Validation Error : ',error);
            res.status(400).json(error);
        }
        else if(error){
            console.log(error);
            res.status(500).json(error);
        }
        else{
            console.log('New Event Created for Review',newEvent);
            res.status(201).send("Success");
        }
    });
}

exports.updateReviewEvent = (req, res)=>{
    EventsReview.findByIdAndUpdate(req.body.id,req.body,(err,data)=>{
        if(err){
            console.log("Couldn't update Event",err);
            res.status(500).json(error);
        }
        else{
            console.log("Review Event Successfully Updated");
            res.status(201).send("Succes");
        }
    })
}

exports.deleteReviewEvent = (req,res)=>{
    if(!req.body.hasOwnProperty("id") && req.body.id==null){
        res.status(400).send("Bad Request");
        return;
    }
    EventsReview.deleteOne({_id : req.body.id},(error)=>{
        if(error){
            console.log("Couldn't Delete Event",error);
            res.status(500).send("Server Error");
        }
        else{
            res.status(200).send("Success");
        }
    });
}

exports.approveEvent = (req, res)=>{
    EventsReview.findByIdAndRemove(req.body.id,(error, event)=>{
        if(error){
            console.log("Review Event not found",error);
            res.status(404).send("Event Not Found");
        }
        else{
            console.log(event.toJSON());
            delete event._id;
            Events.create(event.toJSON(), (err, obj)=>{
                if(err){
                    console.log("Couldn't add Event to Approved Events",err,event);
                    res.status(500).send("Server Error");
                }
                else{
                    res.status(201).send("Succes");
                }
            });
        }
    });
}

/* Add Events for admins and by scraping
    request body : {
        title : ..,
        description : .. (opt),
        location : ..,
        date : ..,  (js Date(yyyy,mm,dd,hh,mm,ss(opt)))
        duration : ...(in minutes)    
    }
*/
exports.addEvent = (req, res)=>{
    var saveObj = req.body;
    saveObj.date = new Date(saveObj.date);
    Events.create(saveObj, (err,obj)=>{
        if(err){
            console.log("Couldn't Add To Approved Event",err);
            res.status(400).send("Bad Request");
        }
        else{
            // console.log("Added to Approved Events",obj);
            res.status(201).send("Success");
        }
    });
}

exports.updateEvent = (req, res)=>{
    Events.findByIdAndUpdate(req.body.id,req.body,(err,data)=>{
        if(err){
            console.log("Couldn't update Event",err);
            res.status(500).json(error);
        }
        else{
            console.log("Event Successfully Updated");
            res.status(201).send("Succes");
        }
    })
}

exports.deleteEvent = (req,res)=>{
    if(!req.body.hasOwnProperty("id") && req.body.id==null){
        res.status(400).send("Bad Request");
        return;
    }
    Events.deleteOne({_id : req.body.id},(error)=>{
        if(error){
            console.log("Couldn't Delete Event",error);
            res.status(500).send("Server Error");
        }
        else{
            res.status(200).send("Success");
        }
    });
}
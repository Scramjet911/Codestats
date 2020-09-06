const User = require('../models/user');
const {Events} = require('../models/events');
const webpush = require('web-push');

module.exports = (agenda)=>{
    /* Find user, for each active sub, send notification webpush with 
        message = {title : ...,
            body : ...}, 
    after getting event title */
    agenda.define('sendNotification',(job,done)=>{
        let notifItem = job.attrs.data;
        let message = {"title" : "Event upcoming"};
        console.log(notifItem);
        User.findById(notifItem.userId,(error, user)=>{
            if(error){
                console.log("Database Error : ",error);
                done();
                return;
            }
            else if(!user){
                done();
                job.remove();
                return;
            }
            Events.findById(notifItem.eventId, (err, event)=>{
                if(err){
                    console.log("Database Error : ",err);
                    done();
                    return;
                }
                else if(!event){
                    done();
                    job.remove();
                    return;
                }
                else{
                    message.body = event.title;
                    user.subscriptions.forEach(sub => {
                        if(sub.status==1){
                            webpush.sendNotification(sub,JSON.stringify(message))
                            .catch(error => console.log("Notification Send Error",error));
                            console.log("Notification Send!!");
                        }
                        console.log("Activity",sub.status,message);
                    });
                }
            }); 
        });    
        done();
        job.remove(); 
    });
}
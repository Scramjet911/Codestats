const publicKey = process.env.publicKey;
const privateKey = process.env.privateKey;

const webpush = require('web-push');
const Users = require('../models/user');


/*  Function to save the user endpoint in User collection
    Request body should be of format : 
    {
        subscription : {
            endpoint : ...,
            keys : {...}
        }
    }}
 */
exports.addSubscription = (req, res)=>{
    
    // Finds the user using ID and pushes subscription value into subscription Array
    let subval = req.body;
    subval.status = '1';
    console.log(subval);
    // Adds Subscription endpoint if doesn't exist
    Users.findOneAndUpdate({_id : req.params.userId,'subscriptions.endpoint':{$ne:subval.endpoint}}, {$addToSet:{subscriptions : subval}}, (error,success)=>{     
        if(error){
            console.log("Couldn't add Subscriber to User Database",error);
        }
        else{
            console.log('Succesfully Subscribed',success);
            res.json({
                'message' : 'Successfully Subscribed' 
            })
        }
    });
};

/* Update Subscription Request, update subscription to enable(1) or disable(0) 
    Request body of format :
    {
        subId : ..,
        status : ... (1:enable, 0:disable)
    }
*/
exports.updateSubscription = (req, res)=>{
    let subval = req.body;
    Users.findOneAndUpdate({_id : req.params.userId, "subscriptions._id":subval.subId}, {$set:{"subscriptions.$.status" : subval.status}}, (error,success)=>{     
        if(error){
            console.log("Couldn't update Subscriber status",error);
        }
        else{
            console.log('Succesfully Updated',success);
            res.json({
                'message' : 'Successfully Updated' 
            })
        }
    });
}

/* Delete Subscription Request, update subscription to enable(1) or disable(0) 
    Request body of format :
    {
        subId : ..,
    }
*/
exports.deleteSubscription = (req, res)=>{
    let subval = req.body;
    Users.findOneAndUpdate({_id : req.params.userId,"subscriptions._id":subval.subId}, {$pull:{"subscriptions" :{"_id": subval.subId}}}, (error,success)=>{     
        if(error){
            console.log("Couldn't Delete Subscriber from Database",error);
        }
        else{
            console.log('Succesfully Deleted Subscription',success);
            res.json({
                'message' : 'Successfully Deleted' 
            })
        }
    });
}

/* Get a users subscription list, not really necessary since it is retrieved when a user-getbyid is called */
exports.getSubscription = (req, res)=>{
    Users.findById({_id : req.params.userId},(error, user)=>{
        if(error){
            console.log("Unable to get user subscriptions");
        }
        else{
            console.log("Retrieved Subscriptions");
            res.json(user.subscriptions);
        }
    });
}
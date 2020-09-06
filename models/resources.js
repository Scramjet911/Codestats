const mongoose =require('mongoose');
const {ObjectId}=mongoose.Schema;
const resourceSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    authername:{
        type:String,
        default:"Admin"
    },
    // author:{
    //         type:ObjectId,
    //         ref:"User",
    //         required:true
    // },
    category:[{
        type:ObjectId,
        ref:"Category",
        required:true
    }]


},
{timestamps:true});

var resources = mongoose.model("Resources",resourceSchema);
//var resourcesreview = mongoose.model("ResourcesReview",resourceSchema);

module.exports = {
    Resources : resources,
    //ResourcesReview : resourcesreview
}
const mongoose =require('mongoose');
const {ObjectId}=mongoose.Schema;
const Dompurify = require('dompurify');
const {JSDOM} = require('jsdom');
const dompurify = Dompurify(new JSDOM().window);

const discussionSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    authorname:{
        type:String
    },
    author:{
            type:ObjectId,
            ref:"User",
            required:true
    },
    category:[{
        type:String,
        ref:"Category",
        required:true
    }],
    comments:[{
        type:ObjectId,
        ref:'discussioncomment'
    }],


},
{timestamps:true});

discussionSchema.pre('validate', (next)=>{
    if(this.body){
        this.body = dompurify.sanitize(this.body);
    }
    next();
})

module.exports = mongoose.model("Discussion",discussionSchema);
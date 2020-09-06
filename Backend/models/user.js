var mongoose = require('mongoose');
const crypto = require('crypto');  
const {v1 : uuidv1}= require('uuid');
const {ObjectId}  =  mongoose.Schema;

var subscriberSchema = new mongoose.Schema({
    active : {
        type : Number
    },
    endpoint : {
        type : String,
        required : true
    },
    keys : mongoose.Schema.Types.Mixed,
    status : {
        type : Number
    }
});

var userSchema = new mongoose.Schema({
    username :{
        type:String,
        required:true,
        maxlength:15,
        trim:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        maxlength:50,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    encry_password:{
        type:String,
        required:true
    },
    confirmed:{
        type:Boolean,
        default:false
    },
    temp_token:{
        type:String
    },
    salt:String,
    role:{
        type:Number,
        default:0,
    },
    occupation:{
        type:String,
        required:true
    },
    institution:{
        type:String,
        required:true
    },
    designation:{
        type:String
    },
    savedEvents:[{
        type:ObjectId,
        ref:"Events"
    }],
    prog_lang:{
        type:[String],
        default:[]
    },
    DOB:{
      type:Date  
    },
    posts:[{
        type:ObjectId,
        ref:"Article"
    }],
    savedarticles:[{
        type:ObjectId,
        ref:"Article"
    }],
    likedarticles:[{
        type:ObjectId,
        ref:"Article"
    }],
    photo:{
        data:Buffer,
        contentType:String
    },
    comment_hist:[{
        type:ObjectId,
        ref:"Articlecomment"
    }],

    discussion:[{
        type:ObjectId,
        ref:"Discussion"
    }],
    disc_comments:[{
        type:ObjectId,
        ref:"discussioncomment"
    }],
    subscriptions : {
        type : [subscriberSchema]
    },
    following:[{
        type:ObjectId,
        ref:'User'
    }],
    
    followers:[{
        type:ObjectId,
        ref:'User'
    }]
    //todo rating
    
},
{timestamps:true});




userSchema
.virtual("password")
.set(function(password){
    this._password=password
    this.salt=uuidv1();
    this.encry_password=this.securePassword(password)
})
.get(function(){
    return this._password
})

userSchema.methods={
  authenticate:function(plainpassword){
        return this.securePassword(plainpassword)===this.encry_password
  },  
  securePassword : function(plainpassword){
      if(!plainpassword) return "";
      try{
        return  crypto.createHmac('sha256', this.salt)
        .update(plainpassword)
        .digest('hex');
      }catch(err){
            return "";
      }
  }
}

module.exports=mongoose.model("User",userSchema)
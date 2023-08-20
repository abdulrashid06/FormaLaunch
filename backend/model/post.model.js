const mongoose = require("mongoose");
const emailSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
   message:{type:String,required:true},
   count :{type:Number}
});
const PostModel=mongoose.model("postEmail",emailSchema);

module.exports={
    PostModel
}
const mongoose = require('mongoose');
const validator = require('validator');


var userSchema = new mongoose.Schema(
    {
        name:{type:String, default:"User"},
        age:{type:Number, min:[18,"Only Adults are allowed"], required:true},
        email:{
            type:String,
            required:true,
            lowercase:true,
            validate:(value)=>{
                return validator.isEmail(value)
            }
        },
        mobile:{
            type:String,
            default:"000-000000"
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    })
const UserDetails = mongoose.model('users',userSchema);
module.exports={UserDetails}
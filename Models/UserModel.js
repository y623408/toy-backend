const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    streetAddress : {
        type:String,
    },
    city : {
        type:String,
    },
    state : {
        type:String,
    },
    pincode : {
        type:String,
    },
    address : {
        type:String,
    }
})

const userModel=mongoose.model("users",userSchema)
module.exports=userModel
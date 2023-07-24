const mongoose=require('mongoose');

const registrationSchema=mongoose.Schema({
    firstName:String,
    lastName:String,
    rollNo:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const RegistrationModel=mongoose.model("registrations",registrationSchema);
module.exports=RegistrationModel
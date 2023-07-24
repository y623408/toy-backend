const mongoose=require('mongoose');

const AdminSchema=mongoose.Schema({
    
    user_name:{
        type:String,
        required:true
    },
    user_password:{
        type:String,
        require:true
    },
})

const AdminModel=mongoose.model("AdminDetail",AdminSchema)
module.exports=AdminModel
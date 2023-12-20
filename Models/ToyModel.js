const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    user_id:{
        type:String,
        required: true
    },
    toyname:{
        type:String,
        required:true
    },
    description:{
        type:String,
        require:true
    },
    pic:{
        type:String,
    },
    price:{
        type:String,
        require:true
    },
    rating:{
        type:String,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },
    status:{
        type:String,
        require:true
    }
})

const userModel=mongoose.model("toys",userSchema)
module.exports=userModel
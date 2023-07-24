const mongoose=require('mongoose');

const studentSchema=mongoose.Schema({
    rollNo:{
        type:String,
        required:true
    },
    student_name:{
        type:String,
        required:true
    },
    student_year:{
        type:Number,
        require:true
    },
    student_room:{
        type:Number,
        require:true
    },
    student_email:{
        type:String,
        require:true
    },
})

const StudentModel=mongoose.model("studentinfo",studentSchema)
module.exports=StudentModel
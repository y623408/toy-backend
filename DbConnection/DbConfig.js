const mongoose=require('mongoose');

const DATABASE=process.env.DATABASE;
mongoose.connect(DATABASE,{
    useNewUrlParser:true,useUnifiedTopology:true
}).then(()=>{
    console.log('Database connected successfully')
}).catch((error)=>{
    console.log('DB-Error',error)
})

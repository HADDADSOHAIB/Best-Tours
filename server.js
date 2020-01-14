const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});

const mongoose=require('mongoose');
const app=require('./app');

mongoose.connect(process.env.DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(conn=>{
    console.log("db connections is runnig with success");
}).catch((err)=>{
    console.log("connection to db failer");
    console.log(err);
});


const port=process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`running on port ${port}`);
});

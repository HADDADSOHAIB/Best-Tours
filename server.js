const mongoose=require('mongoose');
const app=require('./app');
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});

process.on('uncaughtException',err=>{
    console.log(err);
    process.exit(1);
});

mongoose.connect(process.env.DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(conn=>{
    console.log("db connections is runnig with success");
}).catch((err)=>{
    console.log("connection to db failed");
    console.log(err.name,err.message);
});

const port=process.env.PORT || 3000;
const server=app.listen(port, () => console.log(`running on port ${port}`));

process.on('unhandledRejection',err => {
    console.log(err);
    server.close(() => process.exit(1));
});

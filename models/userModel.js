const mongoose=require('mongoose');
const validator=require('validator');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'The name is required']
    },
    email:{
        type:String,
        required:[true,'The name is required'],
        lowercase:true,
        unique:[true,'The entered value is dublicated (it should be unique'],
        validate:[validator.isEmail,'Please provide a valid email']
    },
    photo:{
        type:String
    },
    password:{
        type:String,
        required:[true,'The name is required'],
        minlength:8
    },
    confirmPassword:{
        type:String,
        required:[true,'The name is required']
    }
});

module.exports= mongoose.model('User',userSchema);
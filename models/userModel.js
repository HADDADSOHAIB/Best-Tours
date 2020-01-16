const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');

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
        required:[true,'The password is required'],
        minlength:8,
        select:false
    },
    confirmPassword:{
        type:String,
        required:[true,'The password confirm is required'],
        validate:{
            validator: function(el){
                return el=== this.password;
            },
            message:'the passwords are identicals'
        }
    }
});

userSchema.pre('save',async function(next){
    if(!this.isModified(this.password)) return next();
    this.password=await bcrypt.hash(this.password,12);
    this.confirmPassword=undefined;
    next();
});

userSchema.methods.correctPassword=async function(candidatPassword,userPassword){
    return await bcrypt.compare(candidatPassword,userPassword);
}

module.exports= mongoose.model('User',userSchema);
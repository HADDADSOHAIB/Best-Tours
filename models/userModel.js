const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');
const crypto=require('crypto');

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
    role:{
        type:String,
        enum:['user','guide','lead-guide','admin'],
        default:'user'
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
    },
    passwordChangedAt:Date,
    passwordRestToken:String,
    passwordRestExpires:Date
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password=await bcrypt.hash(this.password,12);
    this.confirmPassword=undefined;
    next();
});

userSchema.methods.correctPassword=async function(candidatPassword,userPassword){
    return await bcrypt.compare(candidatPassword,userPassword);
}

userSchema.methods.changedPasswordAfter=function(jwtTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp=parseInt(this.passwordChangedAt.getTime()/1000,10);
        return jwtTimestamp<changedTimestamp;
    }
    return false;
}

userSchema.methods.createPasswordRestToken=function(){
    const restToken=crypto.randomBytes(32).toString('hex');
    this.passwordRestToken=crypto.createHash('sha256').update(restToken).digest('hex');
    this.passwordRestExpires=Date.now()+10*60*1000;

    return restToken;
}

module.exports= mongoose.model('User',userSchema);
const mongoose=require('mongoose');

const reviewSchema=new mongoose.Schema({
    review:{
        type:String,
        maxlength:[500,'the maximum allowed number of caracters are 500'],
        required:[true,'this field review is required']
    },
    rating:{
        type:Number,
        required:[true,'this field is required'],
        max:[5,'the max value is 5'],
        min:[1,'the min value is 1']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    tour:{
        type:mongoose.Schema.ObjectId,
        ref:'Tour',
        required:[true,'this field tour is required']
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,'this field user is required']
    }
},{
    toJSON:{ virtuals:true },
    toObject:{ virtuals:true },
    id: false
});

reviewSchema.pre(/^find/,async function(next){
    
    this.populate({
        path:'user',
        select:'name _id photo'
    });
    next();
});


module.exports=mongoose.model('Review',reviewSchema);
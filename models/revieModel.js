const mongoose=require('mongoose');
const Tour=require('./tourModel');
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

reviewSchema.index({tour:1,user:1},{unique:true});

reviewSchema.pre(/^find/,async function(next){
    
    this.populate({
        path:'user',
        select:'name _id photo'
    });
    next();
});

reviewSchema.statics.calcAverageRatings=async function(tourId){
    const stats=await this.aggregate([
        {
            $match:{tour:tourId}
        },
        {
            $group:{
                _id:'$tour',
                nRating:{ $sum:1},
                avgRating:{ $avg:'$rating'}
            }
        }
    ]);
    if(stats.length>0)
    await Tour.findByIdAndUpdate(tourId,{ratingsQuantity:stats[0].nRating,ratingsAverge:stats[0].avgRating});
    else
    await Tour.findByIdAndUpdate(tourId,{ratingsQuantity:0,ratingsAverge:4.5});
}

reviewSchema.post('save',function(){
    this.constructor.calcAverageRatings(this.tour);
});

reviewSchema.pre(/^findOneAnd/,async function(next){
    this.r=await this.findOne();
    next();
});

reviewSchema.post(/^findOneAnd/,async function(){
    await this.r.constructor.calcAverageRatings(this.r.tour)
});


module.exports=mongoose.model('Review',reviewSchema);
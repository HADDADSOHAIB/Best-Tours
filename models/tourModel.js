const mongoose=require('mongoose');
const slugify=require('slugify');
const User=require('./userModel');

const tourSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'tour must have a name'],
        unique:true,
        maxlength:[40,'The length of the name should not be more then 40 caracters'],
        minlength:[10,'the length of the name should be more then 10 caracters']
    },
    slug:String,
    duration:{
        type:Number,
        required:[true,'A tour must have a duration']
    },
    maxGroupSize:{
        type:Number,
        required:[true,'Tour must have a group size']
    },
    difficulty:{
        type:String,
        required:[true,'Must have a difficulty'],
        enum:{
            values:['easy','medium','difficult'],
            message:'difficulty is either easy, medium or difficult'
        }
    },
    ratingsAverge:{
        type:Number,
        default:4.5,
        min:[1,'rating must be above 1'],
        max:[5,'rating can not be above 5']
    },
    ratingsQuantity:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:[true,'tour must have a price']
    },
    priceDiscount:Number,
    summary:{
        type:String,
        trim:true,
    },
    description:{
        type:String,
        trim:true,
        required:[true,'A tour must have a description']
    },
    imageCover:{
        type:String,
        required:[true,'A tour must have a cover image']
    },
    images:[String],
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false
    },
    startDates:[Date],
    secretTour:{
        type:Boolean,
        default:false
    },
    startLocation:{
        type:{
            type:String,
            default:'Point',
            enum:['Point']
        },
        coordinates:[Number],
        address:String,
        description:String
    },
    locations:[{
        type:{
            type:String,
            default:'Point',
            enum:['Point']
        },
        coordinates:[Number],
        address:String,
        description:String,
        day:Number
    }],
    guides:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'User'
        }
    ]
},
{
    toJSON:{ virtuals:true },
    toObject:{ virtuals:true },
    id: false
}); 

tourSchema.virtual('durationWeeks').get(function(){
    return this.duration/7;
});

tourSchema.virtual('reviews',{
   ref :'Review',
   foreignField:'tour',
   localField:'_id'
});

tourSchema.pre('save',function(next){
    this.slug=slugify(this.name,{lower:true});
    next();
});

tourSchema.pre(/^find/,function(next){
    this.find({secretTour:{$ne:true}});
    next();
});

tourSchema.pre('aggregate',function(next){
    this.pipeline().unshift({$match:{ secretTour:{$ne:true}}}); 
    next();
});

// tourSchema.pre('save', async function(next){
//     const guidesPromises = this.guides.map(async id=>{
//         await User.findById(id);
//     });
//     this.guides=await Promise.all(guidesPromises);
//     next();
// });
tourSchema.pre(/^find/,function(next){
    this.populate({
        path:'guides',
        select:'-_v -passwordChangedAt'
    });
    next();
});
const Tour=mongoose.model('Tour',tourSchema);
module.exports= Tour;
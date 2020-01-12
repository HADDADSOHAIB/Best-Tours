const fs=require('fs');

const tours=JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkId=(req,res,next,val)=>{
    const id=val*1;
    const tour=tours.find(el=>el.id===id);
    if(!tour){
        res.status(404).json({
            status:'not found'
        });
    }
    next();
}

exports.checkBody=(req,res,next)=>{
    if(!req.body.name || !req.body.price){
        res.status(400).json({
            status:'bad request',
            message:'fix the price or name of the tour'
        });
    }
    next();
}

exports.getAllTours=(req,res)=>{
    res.status(200).json({
        status:'succes',
        results:tours.length,
        data:{
            tours
        }
    });
}

exports.getTour=(req,res)=>{
    const id=req.params.id*1;
    const tour=tours.find(el=>el.id===id);
    res.status(200).json({
        status:'succes',
        data:{
            tour
        }
    });
}

exports.createTour=(req,res)=>{
    const newId=tours[tours.length-1].id+1;
    const newTour=Object.assign({id:newId},req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours),err=>{
        res.status(201).json({
            status:'succcess',
            data:{
                tour:newTour
            }
        });
    });
}

exports.updateTour=(req,res)=>{
    res.status(200).json({
        status:'success',
        data:{
            tour:`<updated tour ${req.params.id} here ...>`
        }
    })
}

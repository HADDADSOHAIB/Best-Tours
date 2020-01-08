const express=require('express');
const app=express();
const fs=require('fs');

app.use(express.json());

const port=3000;

// app.get('/',(req,res)=>{
//     res.status(200).json({message:'hello from server',app:'natours'});
// });

// app.post('/',(req,res)=>{
//     res.send('you can post this');
// });
const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours',(req,res)=>{
    res.status(200).json({
        status:'succes',
        results:tours.length,
        data:{
            tours
        }
    });
});

app.get('/api/v1/tours/:id',(req,res)=>{
    const id=req.params.id*1;
    const tour=tours.find(el=>el.id===id);
    if(tour){
        res.status(200).json({
            status:'succes',
            data:{
                tour
            }
        });
    }
    else{
        res.status(404).json({
            status:'not found'
        });
    }
    
});  

app.post('/api/v1/tours',(req,res)=>{
    // console.log(req.body);
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
});

app.listen(port, ()=>{
    console.log(`running on port ${port}`);
});
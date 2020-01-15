const AppError=require('./../utils/appError');

module.exports=(err, req, res, next)=>{
    
    err.statusCode=err.statusCode || 500;
    err.status=err.status || 'error';

    const handelCastErrorDb=err=>{
        const message= `Invalid ${err.path}: ${err.value}`;
        return new AppError(message,400);
    }

    const handelDuplicateFieldsDB=err=>{
        const value=err.errmsg.match(/(["'])(?:\\.|[^\\])*?\1/);
        const message=`Duplicate fields value: ${value[0]} Please use another value`;
        return new AppError(message,400);
    }

    const handelValidationErrorDB=err=>{
        const errors=Object.values(err.errors).map(el=>el.message);
        const message=`Invalid input data. ${errors.join('. ')}`;
        return new AppError(message,400);
    }

    const sendErrorDev=(err,res)=>{
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message,
            error:err,
            stack:err.stack
        });
    }

    const sendErrorProd=(err,res)=>{
        if(err.isOperational){
            res.status(err.statusCode).json({
                status:err.status,
                message:err.message
            });
        }
        else{
            console.error(err);
            res.status(500).json({
                status:'error',
                message:'something went very wrong'
            });
        }
    }

    if(process.env.NODE_ENV==='development'){
       sendErrorDev(err,res); 
    }
    else if(process.env.NODE_ENV==='production'){
        let error={...err};
        if(error.name==='CastError')
        error=handelCastErrorDb(error);
        else if(err.code=11000)
        error=handelDuplicateFieldsDB(error);
        else if(error.name==='ValidationError')
        error=handelValidationErrorDB(error);

        sendErrorProd(error,res);
    }
}
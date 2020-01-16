const User=require('./../models/userModel');

exports.getAllUsers=async (req,res)=>{
    const users=await User.find();
    res.status(200).json({
        status:'succes',
        results:users.length,
        data:{
            users
        }
    });
    
    res.status(500).json({
        status: 'error',
        message:'this route is not yet defined'
    });
}

exports.getUser=(req,res)=>{
    res.status(500).json({
        status: 'error',
        message:'this route is not yet defined'
    });
}

exports.updateUser=(req,res)=>{
    res.status(500).json({
        status: 'error',
        message:'this route is not yet defined'
    });
}

exports.createUser=(req,res)=>{
    res.status(500).json({
        status: 'error',
        message:'this route is not yet defined'
    });
}

exports.deleteUser=(req,res)=>{
    res.status(500).json({
        status: 'error',
        message:'this route is not yet defined'
    });
}

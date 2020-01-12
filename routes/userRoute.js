const express=require('express');
const router=express.Router();

const usercontroller=require('../controllers/userController');
router
    .route('/')
    .get(usercontroller.getAllUsers)
    .post(usercontroller.createUser);

router
    .route('/:id')
    .get(usercontroller.getUser)
    .patch(usercontroller.updateUser)
    .delete(usercontroller.deleteUser);

module.exports=router;
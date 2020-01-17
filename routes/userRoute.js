const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');
const authController=require('../controllers/authController');

router.post('/signup',authController.signup);
router.post('/login',authController.login);
router.post('/forgotPassword',authController.forgotPassword);
router.patch('/restPassword/:token',authController.restPassword);
route.patch('/updateMyPassword',authController.protect,authController.updatePassword);
route.patch('/updateMe',authController.protect,authController.updateMe);

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports=router;
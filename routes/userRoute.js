const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');
const authController=require('../controllers/authController');

router.post('/signup',authController.signup);
router.post('/login',authController.login);
router.post('/forgotPassword',authController.forgotPassword);
router.patch('/restPassword/:token',authController.restPassword);
router.use(authController.protect);
router.patch('/updateMyPassword',authController.updatePassword);
router.patch('/updateMe',userController.uploadUserPhoto,userController.updateMe);
router.patch('/deleteMe',userController.deleteMe);
router.route('/me').get(
    userController.getMe,
    userController.
    userController.getUser
);
router
    .route('/')
    .get(
        authController.restrictTo('admin'),
        userController.getAllUsers
    );

router
    .route('/:id')
    .get(
        authController.restrictTo('admin'),
        userController.getUser
    ).patch(
        authController.restrictTo('admin'),
        userController.updateUser
    ).delete(
        authController.restrictTo('admin'),
        userController.deleteUser
    );

module.exports=router;
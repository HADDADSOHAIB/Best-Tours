const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');
const authController=require('../controllers/authController');

router.post('/signup',authController.signup);
router.post('/login',authController.login);
router.post('/forgotPassword',authController.forgotPassword);
router.patch('/resetPassword/:token',authController.restPassword);
router.use(authController.protect);
router.patch('/updateMyPassword',authController.updatePassword);
router.patch('/updateMe',
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.updateMe);
router.patch('/deleteMe',userController.deleteMe);
router.get('/me',
    userController.getMe,
    userController.getUser
);
router.route('/').get(userController.getAllUsers);

router.route('/:id').get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;

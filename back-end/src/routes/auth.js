const express=require('express');
const { signup,signin } = require('../controller/auth');
const router=express.Router();
const User=require('../models/user');
const { validatorAuth, validatorAuthSign } = require('../validator/authAdmin');
const{isRequestValidated,requireSignin}=require('../common-middleware/index');

router.post('/signin',validatorAuthSign,isRequestValidated,signin);
router.post('/signup',validatorAuth,isRequestValidated,signup);

router.post('/profile',requireSignin,(req,res)=>{
    res.status(200).json({   
        User:'profile '
    });
});

module.exports=router;
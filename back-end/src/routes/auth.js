const express=require('express');
const { signup,signin, requireSignin } = require('../controller/auth');
const router=express.Router();
const User=require('../models/user');

router.post('/signin',signin);
router.post('/signup',signup);

router.post('/profile',requireSignin,(req,res)=>{
    res.status(200).json({   
        User:'profile '
    });
});

module.exports=router;
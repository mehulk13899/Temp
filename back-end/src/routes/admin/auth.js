const express=require('express');
const { signup,signin, requireSignin } = require('../../controller/admin/auth');
const router=express.Router();
const Admin=require('../../models/admin');

router.post('/signin',signin);
router.post('/signup',signup);

router.post('/profile',requireSignin,(req,res)=>{
    res.status(200).json({   
        message:'profile '
    });
});

module.exports=router;
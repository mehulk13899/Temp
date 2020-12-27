const express=require('express');
const { signup,signin } = require('../../controller/admin/auth');
const router=express.Router();
const Admin=require('../../models/admin');
const { validatorAuth, validatorAuthSign } = require('../../validator/authAdmin');
const{isRequestValidated,requireSignin}=require('../../common-middleware/index');

router.post('/signin',validatorAuthSign,isRequestValidated,signin);
router.post('/signup',validatorAuth,isRequestValidated,signup);

router.post('/profile',requireSignin,(req,res)=>{
    res.status(200).json({   
        message:'profile '
    });
});

module.exports=router;
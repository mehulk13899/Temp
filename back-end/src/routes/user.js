const express=require('express');
const { signup } = require('../controller/user');
const router=express.Router();
const User=require('../models/user');

router.post('/signin',(req,res)=>{

});

router.post('/signup',signup);

module.exports=router;
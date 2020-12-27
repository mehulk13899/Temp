const express=require('express');
const router=express.Router();
const { addCategory, getCategory }=require('../controller/category');
const{ adminMiddleware, requireSignin }=require('../common-middleware/index')

router.post('/category/create',requireSignin,adminMiddleware,addCategory);
router.get('/category/get',getCategory);

module.exports=router;
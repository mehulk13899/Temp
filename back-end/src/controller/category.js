const Category=require('../models/category');
const slugify=require('slugify');
const category = require('../models/category');

exports.addCategory=(req,res)=>{

    Category.findOne({name:req.body.name})
    .exec((error,category)=>{
        if(error)
        return res.status(400).json({message:'Error in create category'});
        if(category) 
        {
            if(!category.parentId){
                return res.status(400).json({
                    message:'Category already exists'
                })
            }
            else{
                return res.status(400).json({
                    message:'subCategory already exists'
                })
            }

        }
    });
    const categoryObj={
        name:req.body.name,
        slug:slugify(req.body.name)
    };

    if(req.body.parentId)
    {
        categoryObj.parentId=req.body.parentId;
    };

    const cat=new Category(categoryObj);

    cat.save((error,category)=>{
        if(error) return res.status(400).json({error});
        if(category){
            return res.status(201).json({category});
        }
    });
}

exports.getCategory=(req,res)=>{
    Category.find({})
    .exec((error,categorys)=>{
        if(error)
        return res.status(400).json({message:'Error in get category'});
        if(category){
            return res.status(200).json({categorys})
        }
    });
}

const Admin=require('../../models/admin');
const jwt=require('jsonwebtoken');

exports.signup =(req,res)=>{
    Admin.findOne({email:req.body.email})
    .exec((error,admin)=>{
        if(error) return res.status(400).json({
            message:'Something went wrong'
        });
        if(admin) return res.status(400).json({
            message:'Admin already registered'
        });
        
    });

    const{
        firstName,
        lastname,
        email,
        password
    }=req.body;

    const _admin=new Admin({
        firstName,
        lastname,
        email,
        password,
        adminname:Math.random().toString(),
        role:'admin'
    });

    _admin.save((error,data)=>
    {
        if(error)
        {
            return res.status(400).json({
                message:'Admin not save'
            });
        }
        if(data){
            return res.status(201).json({   
                message:'Admin saved'
            });
        }
    });
}

exports.signin =(req,res)=>
{
    console.log('Hello');
    Admin.findOne({email:req.body.email})
    .exec((error,admin)=>{
        if(error) return res.status(400).json({error,
        message:'error in signin admin'});
        if(admin) {
            if(admin.authenticate(req.body.password)&&admin.role==='admin')
            {
                const token=jwt.sign({_id:admin._id},process.env.JWT_SECRET,{expiresIn:'1h'});
                const{_id,firstName,lastname,email,role,fullname}=admin;
                res.status(200).json({
                    token,
                    admin:{_id,fullname}
                });
            }
            else{
                return res.status(400).json({message:'Invalid Password'});
            }
        }else{
            return res.status(400).json({message:'Something went wrong'});
        }

    });
}

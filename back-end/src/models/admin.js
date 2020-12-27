const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const { unsubscribe } = require('../routes/admin/auth');

const adminSchema=new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        trim:true,
        min:3,
        max:30
    },
    lastname:{
        type:String,
        require:true,
        trim:true,
        min:3,
        max:30
    },
    adminname:{
        type:String,
        require:true,
        trim:true,
        unique:true,
        lowercase:true,
        max:30
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true,
        lowercase:true,
    },
    hash_password:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        default:'admin',
    },
    contact:{
        type:String
    },
    profilePicture:{type:String},
},{timestamps:true});

adminSchema.virtual('password')
.set(function(password)
{
    this.hash_password=bcrypt.hashSync(password,10);
})

adminSchema.virtual('fullname')
.get(function(){
    return `${this.firstName} ${this.lastname}`
});

adminSchema.methods ={
    authenticate:function(password){
        return bcrypt.compareSync(password,this.hash_password);
    }
}

module.exports=mongoose.model('Admin',adminSchema);
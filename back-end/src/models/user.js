const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const { unsubscribe } = require('../routes/auth');

const userSchema=new mongoose.Schema({
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
    username:{
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
        enum:['user','admin'],
        default:'user',
    },
    contact:{
        type:String
    },
    profilePicture:{type:String},
},{timestamps:true});

userSchema.virtual('password')
.set(function(password)
{
    this.hash_password=bcrypt.hashSync(password,10);
})

userSchema.virtual('fullname')
.get(function(){
    return `${this.firstName} ${this.lastname}`
});

userSchema.methods ={
    authenticate:function(password){
        return bcrypt.compareSync(password,this.hash_password);
    }
}
module.exports=mongoose.model('User',userSchema);
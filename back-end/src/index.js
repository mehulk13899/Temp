const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose = require('mongoose');


//routes
const authRoutes=require('./routes/auth');
//enviorment variable;
const env=require('dotenv');
env.config({path:'F:/ecommerce/back-end/src/.env'});
console.log(process.env.MONGO_DB_USER);
console.log('Hello');

//middleware
app.use(bodyParser());
app.use('/api',authRoutes);

 mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.a5mtk.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
 {
     useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex:true
    }).then(()=>{
        console.log('Database connected');
    });

app.listen(process.env.PORT,()=>{
    console.log(`Server is Running on port ${process.env.PORT}`)
});

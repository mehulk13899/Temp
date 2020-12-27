const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
//enviorment variable;
const env=require('dotenv');
env.config({path:'F:/ecommerce/back-end/src/.env'});

//routes
const authRoutes=require('./routes/auth');
const adminRoutes=require('./routes/admin/auth');

//middleware
app.use(bodyParser());
app.use('/api',authRoutes);
app.use('/api/admin',adminRoutes);

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

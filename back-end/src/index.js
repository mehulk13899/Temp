const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const env=require('dotenv');
const mongoose = require('mongoose');


//routes
const userRoutes=require('./routes/user');
//enviorment variable;
env.config();

//middleware
app.use(bodyParser());
app.use('/api',userRoutes);

 mongoose.connect(`mongodb+srv://admin:admin@cluster0.a5mtk.mongodb.net/ecommerce_new?retryWrites=true&w=majority`,
 {
     useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex:true
    }).then(()=>{
        console.log('Database connected');
    });

app.listen(3000,()=>{
    console.log(`Server is Running on port 5000`)
});

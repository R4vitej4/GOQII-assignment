const express = require('express');
const cors=require('cors');
const db=require('./db');
const userrouter = require('./routes/userRoutes')
const error=require('./routes/errorMiddleware')
const port= 8000 || process.env.PORT
const app=express();


app.use(cors());
app.use(express.json());


app.use('/api', userrouter);


app.get('/',(req,res)=>{
    res.status(200).json({
        message:"hello there"
    })
});


app.use(error);
app.listen(port,()=>{
    console.log(`server is listening at port ${port}`);
})
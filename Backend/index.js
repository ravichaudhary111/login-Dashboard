const express=require('express');
const app=express();

const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS - allow frontend origin and credentials
const cors = require('cors');
const allowedOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
app.use(
    cors({
        origin: allowedOrigin,
        credentials: true,
    }),
);

const dotenv=require('dotenv');
dotenv.config();

const cookieParser=require('cookie-parser');
app.use(cookieParser());

require('./db/db');

const userRouter=require('./route/user.route');

const authRouter=require('./route/auth.route');

const port=process.env.PORT || 8000

app.use('/auth',authRouter);
app.use('/user',userRouter);

app.get('/',(req,res)=>{
    res.send('checking')
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})

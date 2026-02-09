const mongoose=require('mongoose');
const dbUrl=process.env.DBURL;

mongoose.connect(dbUrl).then(()=>{
    console.log('db connected successfully')
}).catch((err)=>{
    console.log('db connection failed',err)
})
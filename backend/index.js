const express =require("express");
const cors = require('cors');

const {connection}=require("./config/db.js")
const {PostRouter}=require("./routers/post.router.js")



const app=express();
app.use(express.json());

app.use(cors());

app.use("/post",PostRouter)





app.listen(9090,async()=>{

try{
    await connection
    console.log("connected to the DB")
}catch(err){
    console.log(err)
}
    console.log("Server is active");
})
const express=require("express");
const { createSchool, listSchools } = require("./Contollers/schoolController");

const app=express();

app.use(express.json())

app.get("/",(req,res)=>{
    res.json({
        message:"hellooo"
    })
})
app.post("/api/addSchool",createSchool)
app.get("/api/listSchools",listSchools)

module.exports=app
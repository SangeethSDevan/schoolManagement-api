const app=require("./app")
const connection =require("./Model/connection")
require("dotenv").config()

const PORT=process.env.PORT||3000

const createTableQuery=`CREATE TABLE IF NOT EXISTS schools(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);`

connection.query(createTableQuery,(err,res)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("Table created or exist!")
})


app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
})
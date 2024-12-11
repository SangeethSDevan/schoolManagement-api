const mysql=require("mysql2")
require("dotenv").config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PWSD,
    database: process.env.DB_DATABASE,
});

connection.connect((err)=>{
    if(err){
        console.log("ERROR: ",err.message);
        return
    }
    console.log(`DB connection success!`)
})

module.exports=connection
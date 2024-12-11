const connection =require("../Model/connection")


exports.createSchool=(req,res)=>{
    const {name,address,latitude,longitude}=req.body

    if(!name||!address||!latitude||!longitude){
        return res.status(400).json({
            status:"ERROR",
            message:"All the fields are required!"
        })
    }
    if(typeof name!="string"||typeof address!="string"){
        return res.status(400).json({
            status:"ERROR",
            message:"Name and address must be strings"
        })
    }
    if(!isValidNumber(latitude)||!isValidNumber(longitude)){
        return res.status(400).json({
            status:"ERROR",
            message:"latitudes and longitudes must be of type number"
        })        
    }
    const query=`INSERT INTO schools (name,address,latitude,longitude)
                VALUES (?,?,?,?)`

    connection.query(query,[name,address,latitude,longitude],(err,result)=>{
        if(err){
            console.log("ERROR",e);
            return res.status(500).json({
                status:"ERROR",
                message:"Error adding school!",
                log:e
            })
        } 
        return res.status(200).json({
            status:"SUCCESS",
            message:"School was added!",
        })
    })
}

exports.listSchools=async(req,res)=>{
    const {latitude,longitude}=req.query

    const lat=parseFloat(latitude);
    const lon=parseFloat(longitude)

    connection.execute("SELECT * FROM schools",(err,result)=>{
        if(err){
            return res.status(500).json({
                status:"ERROR",
                message:"Something went wrong!",
                log:err
            })
        }

        
        const schools=result.map(school=>{
            const distance=haverise(lat,lon,school.latitude,school.longitude)

            return {
                ...school,
                distance
            }
        })

        schools.sort((a,b)=>a.distance-b.distance)

        return res.status(200).json({
            status:"SUCCESS",
            message:"Sorted Schools: ",
            data:{
                length:schools.length,
                schools
            }
        })
    })
}

const isValidNumber = (value) => Number.isFinite(Number(value));


const haverise=(lat1D,lon1D,lat2D,lon2D)=>{

    const {sin,cos,sqrt,atan2}=Math

    function toRad(deg){
        return deg * Math.PI/180
    }
    const lat1=toRad(lat1D)
    const lat2=toRad(lat2D)
    const lon1=toRad(lon1D)
    const lon2=toRad(lon2D)

    const R = 6371;
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
    const a = sin(dLat / 2) * sin(dLat / 2)
            + cos(lat1) * cos(lat2)
            * sin(dLon / 2) * sin(dLon / 2);
    const c = 2 * atan2(sqrt(a), sqrt(1 - a)); 
    const d = R * c;
    return d;
}

const MiddleWare= (err,req,res,next)=>{
    console.log("this is a fake error")
    const statusCode= res.statuscode?res.statuscode:500
    res.status(statusCode)
    res.json({message: err.message, stack: process.env.NODE_ENV==="development"? err.stack : null})
}

module.exports= MiddleWare


export const errorMiddleware=(err,req,res,next)=>{
    console.log("here in error handler middleware")
    console.log(err.message,"and",err.statusCode)
    err.message ||= "Internal server error";
    err.statusCode ||= 500;

    if(err.code===11000){
        const error=Object.key(err.keyPattern).join(',');
        err.message=`Duplicate filed  ${error}`
        err.statusCode=400
    }
    if(err.name=='CastError'){
        const errorPath=err.path;
        err.message=`Invalid form of ${errorPath}`;
        err.statusCode=400;

    }

    return res.status(err.statusCode).json({
        success:false,
        message:err.message
    })

}


export const TryCatch=(func)=>async (req,res,next)=>{
    try {
        console.log("here in try block")
        await func(req,res,next)

    } catch (error) {
        console.log("here in catch block :",error)
        next(error)
    }
};


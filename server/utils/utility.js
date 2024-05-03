class ErrorHandler extends Error{

    constructor(message,statusCode){
        super(message);
        this.status=statusCode
        console.log("message :", message)
    }
}

export {ErrorHandler}
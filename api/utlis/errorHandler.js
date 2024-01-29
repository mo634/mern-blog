export const errorHandler = (statusCode,err) => {

    const error = new Error()
    
    error.message= err

    error.statusCode= statusCode
    
    return error
}
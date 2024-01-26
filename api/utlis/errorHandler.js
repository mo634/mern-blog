export const errorHandler = (err) => {

    const error = new Error()
    
    error.message= err.message

    error.statusCode= err.statusCode
    
    return error
}
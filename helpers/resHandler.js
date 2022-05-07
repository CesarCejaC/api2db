const errorHandler = (err, msg,  code=400 )=>{
    console.log(msg)
    return {'Status: ': code, 'message: ': msg, 'error: ' : err }
}

const resHandler = (msg, data, code = 200 ) =>{
    console.log(msg)
    return {'Status: ': code, 'message: ': msg, 'data: ': data}
}

module.exports = {errorHandler, resHandler}
const errorHandler = (err, msg, DB, code=400 )=>{
    console.log(`${msg} en la BD: ${DB}`)
    return {'Status: ': code, 'message: ': msg, 'error: ' : err }
}

const resHandler = (msg, DB, data, code = 200 ) =>{
    console.log(`${msg} en la BD: ${DB}`)
    return {'Status: ': code, 'message: ': msg, 'data: ': data}
}

module.exports = {errorHandler, resHandler}
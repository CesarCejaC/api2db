const errorHandler = (res, err, msg, DB, code=400)=>{
    console.log(`${msg} en la BD: ${DB}`)
    res.status(code)
    res.send({'Status: ': code, 'message: ': msg, 'error: ' : err })
}

const resHandler = (res, msg, DB, data, code = 200 ) =>{
    console.log(`${msg} en la BD: ${DB}`)
    res.status(code)
    res.send({'Status: ': code, 'message: ': msg, 'data: ': data})
}

module.exports = {errorHandler, resHandler}
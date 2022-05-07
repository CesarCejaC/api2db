const express= require('express')
const indexRouter = express.Router()
const ccrmcaduRoutes = require('./ccrmcadu.routes')
const ccrmRoutes = require('./ccrm.routes')

//rutas a ccrmcadu
indexRouter.use('/ccrmcadu', ccrmcaduRoutes)

indexRouter.use('/ccrm', ccrmRoutes)
//rutas a otra base de datos
//indexRouter.use('/otrabasededatos', require('./otrabasededatos.routes'))

module.exports= indexRouter
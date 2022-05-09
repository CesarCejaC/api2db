const express= require('express')
const indexRouter = express.Router()
const ccrmcaduRoutes = require('./ccrmcadu.routes')
const ccrmRoutes = require('./ccrm.routes')

//rutas a ccrmcadu
indexRouter.use('/ccrmcadu', ccrmcaduRoutes)

//rutas a ccrm
indexRouter.use('/ccrm', ccrmRoutes)


module.exports= indexRouter
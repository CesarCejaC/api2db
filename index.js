const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000
const routes = require('./src/routes/index.routes')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res)=>{
    console.log('Root page')
    res.send('Root page')
})
//ruta index.routes
app.use('/api', routes)

app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`)
})

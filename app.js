const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const home_routes = require(path.join(__dirname, '/routes/home.js'))

app.use('/', home_routes)

app.listen(port, () => {
    console.log('App is listening for requests.')
})
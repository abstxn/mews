const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    var options = {
        root: path.join(__dirname, 'public')
    }
    res.status(200).sendFile('index.html', options)
})

app.listen(port, () => {
    console.log('App is listening for requests.')
})
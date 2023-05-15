const express = require('express')
const path = require('path')
const router = express.Router()

router.get('/', (req, res) => {

    var index_path = path.join(path.relative(__dirname, '../'), 'public')

    var options = {
        // root: path.join(__dirname, 'public')
        root: index_path
    }
    res.status(200).sendFile('index.html', options)

})

module.exports = router
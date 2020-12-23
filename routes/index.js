const express = require('express')
const router = express.Router()

// Basic returning the hello world
// router.get('/', (req, res) => {
//     res.send('Hello world')
// })


// Trying out the layout
// server ->(req) route -> layout -> route ->(res) server
router.get('/', (req, res) => {
    res.render('index')
})

// Do not forget to export it to the server.
module.exports = router
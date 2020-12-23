// Simple check for environment 
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')


// Importing the index.js file from our routes.
const indexRouter = require('./routes/index')


app.set('view engine', 'ejs')
app.set('views',__dirname + '/views')                           //save our views in this folder
app.set('layout', 'layouts/layout')                             // Create a layout file inside layouts folder inside the views folder
app.use(expressLayouts)
app.use(express.static('public'))                               //Public views


// Start using mongoose in the project
const mongoose = require('mongoose')
// Initially use a local url to connect. When you shift your application to internet then connect it to internet. Require 'dotenv' to run.
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser:true                                        // options for how we want to use mongoDB.
    // useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))                   //If opened with error then show error
db.once('open', () => console.log('Connected to mongoose'))     //If successful connection print this

// Showing the output of the index.js file
app.use('/', indexRouter)


app.listen(process.env.PORT || 3000)
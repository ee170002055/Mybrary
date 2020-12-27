// Simple check for environment 
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')


// Importing the index.js file from our routes.
const indexRouter = require('./routes/index')
// Similarly creating a new router for our authors.
const auhtorRouter = require('./routes/authors')


app.set('view engine', 'ejs')
app.set('views',__dirname + '/views')                           //save our views in this folder
app.set('layout', 'layouts/layout')                             // Create a layout file inside layouts folder inside the views folder
app.use(expressLayouts)
app.use(express.static('public'))                               //Public views
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))


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

// Showing the output from the index.js
app.use('/', indexRouter)
// Showing the output from the authors folder
// Every route in our authorRouter will be prepended with /authors
app.use('/authors', auhtorRouter)


app.listen(process.env.PORT || 3000)
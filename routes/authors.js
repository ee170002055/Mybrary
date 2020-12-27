// A similar setup like that of our index.js
const express = require('express')
const author = require('../models/author')
const router = express.Router()
const Author = require('../models/author')

// All authors route
router.get('/', async (req, res) => {
    let searchOptions = {}
    // Get req passes through a query while POST req passes through a body.
    if(req.query.name != null && req.query.name !== ''){
        // Regular expression name, case insensitive
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const authors = await Author.find(searchOptions)   // We do not pass any conditions to the find object. This will return us all the authors.
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
        })
    } catch{
        res.redirect('/')
    } 
})

// New author route
// Just for displaying the author and not creating any new.
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author()})
})

// Create a new author
router.post('/', async (req, res) => {
    // res.send('Create')      // Create a new author
    // By default express has no easy way to access the variables we created in the form fields.
    // So we import body-parser into our server. 
    // res.send(req.body.name)   // Just output this name to the server for now
    // Later we will use this name to store it in the database.

    const author = new Author({
        name: req.body.name
    })
    // author.save((err, newAuthor) => {
    //     // If there is an error, render the new author page again
    //     if(err){
    //         res.render('authors/new', {
    //             // Pass the already inputted name so that it gets repopulated 
    //             author: author,
    //             errorMessage: 'Error creating author'
    //         })
    //     } else{
    //         // Redirect to the created new authors page.
    //         // res.redirect(`authors/${newAuthor.id}`)
    //         res.redirect(`/authors`)
    //     }
    // })

    // Instead we use a try catch block here
    try{
        // Everything in mongoose in mongodb is done asynchronously so have will have to wait for the author.save first then populate newAuthor
        const newAuthor = await author.save()
        // res.redirect(`/authors/${newAuthor.id}`)
        res.redirect(`/authors`)
    } catch{
        // Paste the error code here
        res.render('authors/new', {
            // Pass the already inputted name so that it gets repopulated 
            author: author,
            errorMessage: 'Error creating author'
        })
    }
})

// Do not forget to export it to the server.
module.exports = router
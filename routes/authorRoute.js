const express = require('express');
const Author = require('../models/authorModel');

const router = express.Router();

// All authors
router.get('/', async (req, res) => {
    // res.render('authors/index')
    let searchOption = {};
    if (req.query.name != null && req.query.name !== '') {
        searchOption.name = new RegExp(req.query.name, 'i')
    }    

    try {
        const authors = await Author.find(searchOption);
        console.log(authors);
        res.render('authors/index', { authors })
    } catch {
        res.render('authors/index')
    }
})

// New author
router.get('/new', (req, res) => {
    res.render('authors/new');
})

// Create author
router.post('/', async (req, res) => {
    try {
        let name = req.body.name
        const author = await Author.create({ name });
        if (author) {
            res.redirect('/authors')
        }
    } catch  {
        res.render('authors/new', {
            errorMessage: 'Something went wrong happened, try again later.'
        })
    }
})

module.exports = router;

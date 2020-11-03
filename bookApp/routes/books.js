var express = require('express');
const { post, render } = require('../app');
var router = express.Router();
var books = require('../resources/books'); 

router.get('/add', function (req, res, next) {
    res.render('addBooks', {
        title: 'Add book',
    });
});

router.post('/save', function (req,res){
 books.push({...req.body, _id:`00${books.length + 1}`}) 
 res.redirect('/');
});

router.get('/remove/:index',function(req,res){
 books.splice(req.params.index, 1);
 res.redirect('/'); 
});

router.get('/edit/:_id',function(req,res){
 const book = books.find((book) => book._id === req.params._id);
 res.render('editBooks', {
     title: 'Edit Book',
     book
 });
});
router.post('/edit/:_id', function(req,res){
    const bookIndex = books.findIndex(book => book._id === req.params._id);
    books.splice(bookIndex, 1, {...req.body, _id: req.params._id});
    res.redirect('/');
})

module.exports = router; 


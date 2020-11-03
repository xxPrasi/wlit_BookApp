var express = require('express');
const { post, render, set } = require('../app');
var router = express.Router();
var books = require('../resources/books'); 
let Books = require('../models/books'); 

router.get('/add', function (req, res, next) {
    res.render('addBooks', {
        title: 'Add book',
    });
});

router.post('/save', function (req,res){
 //books.push({...req.body, _id:`00${books.length + 1}`}) 
 
 const book = new Books(req.body); 
 let promise = book.save(); 
 promise.then(() =>{
     console.log('Book added');
     res.redirect('/');
 })
 
});

router.get('/remove/:id',function(req,res){
    Books.remove({ _id: req.params.id }, function() {
        res.redirect('/');
    }) 
});

router.get('/edit/:_id',function(req,res){
 //const book = books.find((book) => book._id === req.params._id);
 //res.render('editBooks', {
   //  title: 'Edit Book',
    // book
 //});
 Books.findOne ({_id: req.params._id}, function(err,book){
     res.render('editBooks', {title:'Edit book', book:book});
 })
});
//findOne and Update $set
router.post('/edit/:_id', function(req,res){
   // const bookIndex = books.findIndex(book => book._id === req.params._id);
   // books.splice(bookIndex, 1, {...req.body, _id: req.params._id});
    //res.redirect('/');
    Books.findOneAndUpdate({ _id: req.params._id }, { $set: req.body }, function(err, book) {
        console.log(book);
        res.redirect('/');
    })

})

module.exports = router; 


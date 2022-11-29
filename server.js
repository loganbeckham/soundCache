// =======================================
//              DEPENDENCIES
// =======================================

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser')
const methodOverride = require('method-override')


// =======================================
//              DATABASE
// =======================================
const Sample = require('./models/mySamples.js');
const Collection = require('./models/myCollections.js')


// =======================================
//              ROUTES
// =======================================

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));


////////////////////
// POST ROUTES
////////////////////

// save samples
app.post('/save', (req, res) => {
	Sample.create(req.body, (err, savedSample) => {
		res.redirect('/collection')
	})
})

// create collections
app.post('/create', (req, res) => {
	Collection.create(req.body, (err, savedCollection) => {
		res.redirect('/collection')
	})
})


////////////////////
// PUT ROUTES
////////////////////

// rename collection
app.put('/:id', (req, res) => {
	Collection.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedModel) => {
		res.redirect('/collections')
	})
})


////////////////////
// GET ROUTES
////////////////////

// HOMEPAGE
app.get('/', (req, res)=>{
	Collection.find({}, (err,collectionList) => {
		res.render('index.ejs',
			{
				Collection: collectionList
			}
		)
	})
})

// CACHE
app.get('/collections', getSamples, getCollections, renderForm) 

function getSamples(req, res, next) {
	Sample.find({}, (err, sampleList) => {
		res.locals.Sample = sampleList;
		next();
	});
};

function getCollections(req, res, next) {
	Collection.find({}, (err, collectionList) => {
		res.locals.Collection = collectionList;
		next();
	});
};

function renderForm(req, res) {
	res.render('show.ejs');
}

// CREATE COLLECTION
app.get('/create', (req, res) => {
	res.render('create.ejs');
})

// EDIT COLLECTION
app.get('/:id/edit', (req, res) => {
	Collection.findById(req.params.id, (err, thisCollection) => {
		res.render('edit.ejs',
		{
			Collection: thisCollection
		})
	})
})


////////////////////
// DELETE ROUTES
////////////////////

// DELETE COLLECTION
app.delete('/collections/:id', (req, res) => {
    Sample.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/collections');
    });
})



// =======================================
//              SERVER
// =======================================

mongoose.connect('mongodb+srv://student:uxatSYGYAR8JKlrC@cluster0.aaluezz.mongodb.net/?retryWrites=true&w=majority', () => {
    console.log('connected to mongo');
})

let PORT = 3000;
if(process.env.PORT){
	PORT = process.env.PORT
}

app.listen(PORT, ()=>{
	console.log('listening');
})
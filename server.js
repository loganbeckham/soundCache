const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const Sample = require('./models/mySamples.js');
const Collection = require('./models/myCollections.js')
// const userController = require('./controllers/users_controller.js')
// app.use('/users', userController)

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));


// Index Post
app.post('/save', (req, res) => {
	Sample.create(req.body, (err, savedSample) => {
		res.redirect('/collection')
	})
})

app.post('/create', (req, res) => {
	Collection.create(req.body, (err, savedCollection) => {
		res.redirect('/collection')
	})
})

// Home Page
app.get('/', (req, res)=>{
	res.render('index.ejs');
})


// Show Route
app.get('/collection', getSamples, getCollections, renderForm) 

// Show Route Functions
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


// CREATE Route
app.get('/create', (req, res) => {
	res.render('create.ejs');
})

// DELETE Route
app.delete('/collection/:id', (req, res) => {
    Sample.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/collection');
    });
})

//////////////////////////////
// SERVER
//////////////////////////////

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
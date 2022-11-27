const express = require('express');
const mongoose = require('mongoose');
const app = express();
// const jquery = require('jquery')

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const sampleData = require('./models/sampleSeed.js')
const collection = require('./models/mySamples.js')


let PORT = 3000;
if(process.env.PORT){
	PORT = process.env.PORT
}

app.get('/seed', (req, res) => {
    collection.create(sampleData, (err, sampleList) => {
        res.send(sampleList);
		console.log(collection[0])
    })
})

// Index Post
app.post('/save', (req, res) => {
	collection.create(req.body, (err, savedSample) => {
		console.log(req.body)
		console.log(collection)
		res.redirect('/collection')
	})
})

// Index Page
app.get('/', (req, res)=>{
	res.render('index.ejs');
})

// Show Route
app.get('/collection', (req, res) => {
	collection.find({}, (err, sampleList) => {
		res.render(
			'show.ejs',
			{
				collection: sampleList
			}
		)
	})
})



app.listen(PORT, ()=>{
	console.log('listening');
})

mongoose.connect('mongodb+srv://student:uxatSYGYAR8JKlrC@cluster0.aaluezz.mongodb.net/?retryWrites=true&w=majority', () => {
    console.log('connected to mongo');
})
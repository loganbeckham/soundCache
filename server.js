const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser')
// require('dotenv').config()
// const jquery = require('jquery')

const sampleData = require('./models/sampleSeed.js')
const Sample = require('./models/mySamples.js')
// const userController = require('./controllers/users_controller.js')
// app.use('/users', userController)

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

let PORT = 3000;
if(process.env.PORT){
	PORT = process.env.PORT
}

app.get('/seed', (req, res) => {
    Sample.create(sampleData, (err, sampleList) => {
        res.send(sampleList);
		console.log(Sample[0])
    })
})

// Index Post
app.post('/save', (req, res) => {
	Sample.create(req.body, (err, savedSample) => {
		console.log(req.body)
		console.log(Sample)
		res.redirect('/')
	})
})

// Index Page
app.get('/', (req, res)=>{
	res.render('index.ejs');
})

// Show Route
app.get('/collection', (req, res) => {
	Sample.find({}, (err, sampleList) => {
		res.render(
			'show.ejs',
			{
				Sample: sampleList
			}
		)
	})
})



app.listen(PORT, ()=>{
	console.log('listening');
})

mongoose.connect('mongodb+srv://student:uxatSYGYAR8JKlrC@cluster0.aaluezz.mongodb.net/samples?retryWrites=true&w=majority', () => {
    console.log('connected to mongo');
})
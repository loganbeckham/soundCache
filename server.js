const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser')

const Sample = require('./models/mySamples.js');
// const userController = require('./controllers/users_controller.js')
// app.use('/users', userController)

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// Index Post
app.post('/save', (req, res) => {
	Sample.create(req.body, (err, savedSample) => {
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
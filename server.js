const express = require('express');
const mongoose = require('mongoose');
const app = express();
const jquery = require('jquery');

app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());


let PORT = 3000;
if(process.env.PORT){
	PORT = process.env.PORT
}

app.get('/', (req, res)=>{
	res.render('index.ejs');
})

app.listen(PORT, ()=>{
	console.log('listening');
})

mongoose.connect('mongodb+srv://student:98ar9JM05UDkZpUQ@cluster0.aaluezz.mongodb.net/?retryWrites=true&w=majority', () => {
    console.log('connected to mongo');
})
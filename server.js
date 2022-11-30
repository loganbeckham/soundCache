// =======================================
//              DEPENDENCIES
// =======================================

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser')
const session = require('express-session')
const methodOverride = require('method-override')

require('dotenv').config()

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(
	session({
	  secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
	  resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
	  saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
	})
  )


// =======================================
//              CONTROLLERS
// =======================================

const userController = require('./controllers/users_controller.js')
app.use('/users', userController)

const sessionsController = require('./controllers/sessions_controller.js')
app.use('/sessions', sessionsController)

const mainController = require('./controllers/controller.js');
app.use(mainController);


// =======================================
//              SERVER
// =======================================

const mongodbURI = process.env.MONGODBURI

mongoose.connect(mongodbURI, () => {
    console.log('connected to mongo');
})

if(process.env.PORT){
	PORT = process.env.PORT
}

app.listen(PORT, ()=>{
	console.log('listening');
})
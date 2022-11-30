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

const userController = require('./controllers/users_controller.js')
app.use('/users', userController)

const sessionsController = require('./controllers/sessions_controller.js')
app.use('/sessions', sessionsController)


// =======================================
//              DATABASE
// =======================================
const Sample = require('./models/mySamples.js');
const Collection = require('./models/myCollections.js');

// =======================================
//              ROUTES
// =======================================


////////////////////
// POST ROUTES
////////////////////

// // save samples
// app.post('/save', (req, res) => {
// 	Sample.create(req.body, (err, savedSample) => {
// 		res.redirect('/collection')
// 	})
// })

// create collections
app.post('/create', (req, res) => {
	Collection.create(req.body, (err, savedCollection) => {
		res.redirect('/collections')
	})
})


////////////////////
// PUT ROUTES
////////////////////

// add to collection
app.put('/addTo/:id', (req, res) => {
	Collection.findByIdAndUpdate(req.params.id, {
		$push: {
			'collectionSamples': {
				name: req.body.name,
				preview: req.body.preview
			},
		},
	}, {new:true}, (err, updatedModel) => {
		res.redirect('/')
	})
})

// rename collection
app.put('/:id', (req, res) => {
	Collection.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedModel) => {
		res.redirect('/collections')
	})
})

// rename sample
app.put('/:id/:index', (req, res) => {
	Collection.findByIdAndUpdate(
		{
			_id: req.params.id,
			collectionSamples: 
				{
					_id: req.params.index
				},
		},
		{
			$set: {
				'collectionSamples': {
					name: req.body.name,
				}
			}
		}, {new: true}, (err, updatedModel) => {
			res.redirect(`/${req.params.id}`)
		}
	)
})


////////////////////
// GET ROUTES
////////////////////

// HOMEPAGE
app.get('/', (req, res)=>{
	Collection.find({}, (err,collectionList) => {
		res.render('homepage.ejs',
			{
				Collection: collectionList,
  				currentUser: req.session.currentUser
			}
		)
	})
})

// COLLECTIONS
app.get('/collections', (req, res) => {
	Collection.find({}, (err, collectionList) => {
		res.render('collections.ejs',
			{
				Collection: collectionList,
				currentUser: req.session.currentUser
			}
		)
	})
})

// CREATE COLLECTION
app.get('/create', (req, res) => {
	res.render('create.ejs',
	{
		currentUser: req.session.currentUser
	})
})

// SHOW COLLECTION
app.get('/:id', (req, res) => {
	Collection.findById(req.params.id, (err, thisCollection) => {
		res.render(
			'show.ejs',
			{
				Collection: thisCollection,
				currentUser: req.session.currentUser
			}
		)
	})
})

// EDIT COLLECTION
app.get('/:id/edit', (req, res) => {
	Collection.findById(req.params.id, (err, thisCollection) => {
		res.render('edit.ejs',
		{
			Collection: thisCollection,
			currentUser: req.session.currentUser
		})
	})
})


////////////////////
// DELETE ROUTES
////////////////////

// DELETE COLLECTION
app.delete('/collections/:id', (req, res) => {
    Collection.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/collections');
    });
})

// DELETE SAMPLE FROM COLLECTION
app.delete('/:id/:index', (req, res) => {
	Collection.findByIdAndUpdate(req.params.id, {
		$pull: {
			'collectionSamples': {
				_id: req.params.index
			},
		},
	}, {new: true}, (err, updateModel) => {
		res.redirect(`/${req.params.id}`)
	})
})



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
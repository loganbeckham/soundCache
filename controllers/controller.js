// =======================================
//              DEPENDENCIES
// =======================================

const express = require('express');
const router = express.Router();

// =======================================
//              DATABASE
// =======================================

// const Sample = require('../models/mySamples.js');
const Collection = require('../models/myCollections.js');
// const seed = require('../models/seed.js')


// =======================================
//              ROUTES
// =======================================


// ////////////////////
// // SEED ROUTE
// ////////////////////

// router.get('/seed', (req, res) => {
// 	Collection.create(seed, (err, addCollection) => {
// 		res.send(addCollection);
// 	})
// })


////////////////////
// POST ROUTES
////////////////////

// // SAVE SAMPLES
// app.post('/save', (req, res) => {
// 	Sample.create(req.body, (err, savedSample) => {
// 		res.redirect('/collection')
// 	})
// })

// CREATE COLLECTION
router.post('/create', (req, res) => {
	Collection.create(req.body, (err, savedCollection) => {
		res.redirect('/collections')
	})
})


////////////////////
// PUT ROUTES
////////////////////

// ADD TO COLLECTION
router.put('/addTo/:id', (req, res) => {
	Collection.findByIdAndUpdate(req.params.id, {
		$push: {
			'collectionSamples': {
				name: req.body.name,
				preview: req.body.preview
			},
		},
	}, {new:true}, (err, updatedModel) => {
		res.redirect('/collections')
	})
})

// RENAME COLLECTION
router.put('/collections/:id', (req, res) => {
	Collection.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, thisCollection) => {
		console.log(req.body)
		res.redirect('/collections')
	})
})

// RENAME SAMPLE
router.put('/:id/:index', (req, res) => {
	Collection.findOneAndUpdate(
		{
			_id: req.params.id,
			'collectionSamples._id': req.params.index
		},
		{
			$set : {'collectionSamples.$.name': req.body.name}
		}, {new: true}, (err, updatedModel) => {
			res.redirect(`/${req.params.id}`)
		}
	)
})


////////////////////
// GET ROUTES
////////////////////

// HOMEPAGE
router.get('/', (req, res)=>{
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
router.get('/collections', (req, res) => {
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
router.get('/create', (req, res) => {
	res.render('create.ejs',
	{
		currentUser: req.session.currentUser
	})
})

// SHOW COLLECTION
router.get('/:id', (req, res) => {
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


////////////////////
// DELETE ROUTES
////////////////////

// DELETE COLLECTION
router.delete('/collections/:id', (req, res) => {
    Collection.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/collections');
    });
})

// DELETE SAMPLE FROM COLLECTION
router.delete('/:id/:index', (req, res) => {
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


module.exports = router;